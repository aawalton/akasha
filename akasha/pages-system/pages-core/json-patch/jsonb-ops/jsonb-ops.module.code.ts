import type { Json } from "@akasha/utils-narrow/json-value"
import { asJson } from "../../as-json/as-json.module.code.ts"

export type JsonObject = { [key: string]: Json | undefined }

export function jsonbDelete(target: Json, segs: readonly string[]): Json {
  return jsonbDeleteAt(target, segs, 0)
}

function jsonbDeleteAt(node: Json, segs: readonly string[], depth: number): Json {
  if (depth === segs.length) return null
  const seg = asString(segs[depth])
  if (Array.isArray(node)) {
    const idx = parsePgInt(seg)
    if (idx === null) return node
    if (idx < 0 || idx >= node.length) return node
    if (depth === segs.length - 1) return [...node.slice(0, idx), ...node.slice(idx + 1)]
    const next: Json[] = node.slice()
    next[idx] = jsonbDeleteAt(arrayChild(node, idx), segs, depth + 1)
    return next
  }
  if (node !== null && typeof node === "object") {
    if (!Object.hasOwn(node, seg)) return node
    const out: JsonObject = {}
    if (depth === segs.length - 1) {
      for (const k of Object.keys(node)) {
        if (k !== seg) out[k] = node[k]
      }
      return asJson(out)
    }
    const newChild = jsonbDeleteAt(objectChild(node, seg), segs, depth + 1)
    for (const k of Object.keys(node)) {
      out[k] = k === seg ? newChild : node[k]
    }
    return asJson(out)
  }
  return node
}

export function jsonbSet(
  target: Json,
  segs: readonly string[],
  value: Json,
  createIfMissing: boolean
): Json {
  return jsonbSetAt(target, segs, value, createIfMissing, 0)
}

function jsonbSetAt(
  node: Json,
  segs: readonly string[],
  value: Json,
  createIfMissing: boolean,
  depth: number
): Json {
  if (depth === segs.length) return value
  const seg = asString(segs[depth])
  if (Array.isArray(node)) {
    const idx = parsePgInt(seg)
    if (idx === null) {
      throw new Error(
        `jsonb_set: path element at position ${depth + 1} is not an integer: "${seg}"`
      )
    }
    if (depth === segs.length - 1) {
      if (idx >= 0 && idx < node.length) {
        const next: Json[] = node.slice()
        next[idx] = value
        return next
      }
      if (!createIfMissing) return node
      return idx >= node.length ? [...node, value] : [value, ...node]
    }
    if (idx < 0 || idx >= node.length) return node
    const next: Json[] = node.slice()
    next[idx] = jsonbSetAt(arrayChild(node, idx), segs, value, createIfMissing, depth + 1)
    return next
  }
  if (node !== null && typeof node === "object") {
    const isLeaf = depth === segs.length - 1
    const has = Object.hasOwn(node, seg)
    if (isLeaf) {
      if (!has && !createIfMissing) return node
      const out: JsonObject = {}
      for (const k of Object.keys(node)) out[k] = node[k]
      out[seg] = value
      return asJson(out)
    }
    if (!has) return node
    const newChild = jsonbSetAt(objectChild(node, seg), segs, value, createIfMissing, depth + 1)
    const out: JsonObject = {}
    for (const k of Object.keys(node)) out[k] = k === seg ? newChild : node[k]
    return asJson(out)
  }
  return node
}

export function jsonbInsert(target: Json, segs: readonly string[], value: Json): Json {
  return jsonbInsertAt(target, segs, value, 0)
}

function jsonbInsertAt(node: Json, segs: readonly string[], value: Json, depth: number): Json {
  const seg = asString(segs[depth])
  if (Array.isArray(node)) {
    const idx = parsePgInt(seg)
    if (idx === null) {
      throw new Error(
        `jsonb_insert: path element at position ${depth + 1} is not an integer: "${seg}"`
      )
    }
    if (depth === segs.length - 1) {
      const len = node.length
      const clamped = idx >= len ? len : idx < 0 && -idx > len ? 0 : idx < 0 ? len + idx : idx
      return [...node.slice(0, clamped), value, ...node.slice(clamped)]
    }
    if (idx < 0 || idx >= node.length) return node
    const next: Json[] = node.slice()
    next[idx] = jsonbInsertAt(arrayChild(node, idx), segs, value, depth + 1)
    return next
  }
  if (node !== null && typeof node === "object") {
    const isLeaf = depth === segs.length - 1
    const has = Object.hasOwn(node, seg)
    if (isLeaf) {
      if (has) return node
      const out: JsonObject = {}
      for (const k of Object.keys(node)) out[k] = node[k]
      out[seg] = value
      return asJson(out)
    }
    if (!has) return node
    const newChild = jsonbInsertAt(objectChild(node, seg), segs, value, depth + 1)
    const out: JsonObject = {}
    for (const k of Object.keys(node)) out[k] = k === seg ? newChild : node[k]
    return asJson(out)
  }
  return node
}

function asString(value: unknown): string {
  return value as string
}

export function parsePgInt(s: string): number | null {
  const trimmed = s.trim()
  if (!/^[+-]?\d+$/.test(trimmed)) return null
  const n = Number(trimmed)
  return Number.isInteger(n) ? n : null
}

export function arrayChild(arr: readonly Json[], idx: number): Json {
  const v = arr[idx]
  return v === undefined ? null : v
}

export function objectChild(obj: JsonObject, key: string): Json {
  const v = obj[key]
  return v === undefined ? null : v
}
