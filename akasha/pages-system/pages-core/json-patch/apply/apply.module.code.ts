import type { Json } from "@akasha/utils-narrow/json-value"
import type { JsonPatchOp } from "../../view-state/view-state-change/view-state-change.module.code.ts"
import {
  arrayChild,
  type JsonObject,
  jsonbDelete,
  jsonbInsert,
  jsonbSet,
  objectChild,
  parsePgInt,
} from "../jsonb-ops/jsonb-ops.module.code.ts"

const SYSTEM_KEYS: ReadonlySet<string> = new Set([
  "id",
  "seq",
  "pageTypeId",
  "pageTypeSlug",
  "userId",
  "title",
  "icon",
])

export function applyJsonPatch(value: Json, ops: readonly JsonPatchOp[]): Json {
  let current: Json = value
  for (const op of ops) {
    current = applyJsonPatchOp(current, op)
  }
  return current
}

function applyJsonPatchOp(target: Json, op: JsonPatchOp): Json {
  return applyJsonPatchOpRaw(target, op)
}

function applyJsonPatchOpRaw(target: Json, op: Json): Json {
  if (!isJsonObject(op)) {
    throw new Error("applyJsonPatchOp: op must be a json object")
  }
  const opNameRaw = op.op
  if (opNameRaw === undefined || opNameRaw === null) {
    throw new Error('applyJsonPatchOp: missing "op" field')
  }
  const pathRaw = op.path
  if (pathRaw === undefined || pathRaw === null) {
    throw new Error('applyJsonPatchOp: missing "path" field')
  }
  const opName = jsonbTextCast(opNameRaw)
  const path = jsonbTextCast(pathRaw)

  const segs = jsonPointerSplit(path)

  const first = segs[0]
  if (first === undefined) {
    throw new Error(
      `applyJsonPatchOp: empty path "${path}" — first segment must be an attribute key`
    )
  }
  if (SYSTEM_KEYS.has(first)) {
    throw new Error(
      `applyJsonPatchOp: path "${path}" targets promoted/system-managed key "${first}"`
    )
  }

  if (opName === "remove") {
    if (!jsonPointerExists(target, segs)) {
      throw new Error(`applyJsonPatchOp: remove at "${path}" — target does not exist`)
    }
    return jsonbDelete(target, segs)
  }

  if (!Object.hasOwn(op, "value")) {
    throw new Error(`applyJsonPatchOp: "${opName}" requires a "value" field`)
  }
  const valueRaw = op.value
  const value: Json = valueRaw === undefined ? null : valueRaw

  if (opName === "replace") {
    if (!jsonPointerExists(target, segs)) {
      throw new Error(`applyJsonPatchOp: replace at "${path}" — target does not exist`)
    }
    return jsonbSet(target, segs, value, false)
  }

  if (opName === "add") {
    let parent: Json = target
    if (segs.length > 1) {
      const parentPath = segs.slice(0, -1)
      if (!jsonPointerExists(target, parentPath)) {
        throw new Error(`applyJsonPatchOp: add at "${path}" — parent path does not exist`)
      }
      parent = jsonPointerGet(target, parentPath)
    }
    if (Array.isArray(parent)) {
      const last = segs[segs.length - 1]
      if (last === "-") {
        const appendSegs: string[] = segs.slice(0, -1)
        appendSegs.push(String(parent.length))
        return jsonbInsert(target, appendSegs, value)
      }
      return jsonbInsert(target, segs, value)
    }
    return jsonbSet(target, segs, value, true)
  }

  throw new Error(`applyJsonPatchOp: unsupported op "${opName}" (supported: add, remove, replace)`)
}

function jsonPointerSplit(path: string): readonly string[] {
  if (path === "") throw new Error("jsonPointerSplit: path must not be empty")
  if (path.charAt(0) !== "/") {
    throw new Error(`jsonPointerSplit: path "${path}" must start with /`)
  }
  if (path === "/") return []
  const parts = path.slice(1).split("/")
  const out: string[] = []
  for (const part of parts) {
    const tildeOneToSlash = replaceAllChars(part, "~1", "/")
    const tildeZeroToTilde = replaceAllChars(tildeOneToSlash, "~0", "~")
    out.push(tildeZeroToTilde)
  }
  return out
}

function jsonPointerExists(target: Json, segs: readonly string[]): boolean {
  if (target === null) return false
  if (segs.length === 0) return true
  let cur: Json | undefined = target
  for (const seg of segs) {
    if (cur === null || cur === undefined) return false
    if (Array.isArray(cur)) {
      const idx = parsePgInt(seg)
      if (idx === null) return false
      if (idx < 0 || idx >= cur.length) return false
      cur = cur[idx]
    } else if (typeof cur === "object") {
      if (!Object.hasOwn(cur, seg)) return false
      cur = cur[seg]
    } else {
      return false
    }
  }
  return cur !== undefined
}

function jsonPointerGet(target: Json, segs: readonly string[]): Json {
  let cur: Json = target
  for (const seg of segs) {
    if (Array.isArray(cur)) {
      const idx = parsePgInt(seg)
      if (idx === null) {
        throw new Error(`applyJsonPatchOp: array segment "${seg}" is not an integer`)
      }
      if (idx < 0 || idx >= cur.length) {
        throw new Error(`applyJsonPatchOp: array index ${idx} out of bounds`)
      }
      cur = arrayChild(cur, idx)
    } else if (cur !== null && typeof cur === "object") {
      cur = objectChild(cur, seg)
    } else {
      throw new Error(`applyJsonPatchOp: cannot traverse non-container at "${seg}"`)
    }
  }
  return cur
}

function isJsonObject(value: Json): value is JsonObject {
  return value !== null && typeof value === "object" && !Array.isArray(value)
}

function jsonbTextCast(value: Json): string {
  return typeof value === "string" ? value : JSON.stringify(value)
}

function replaceAllChars(input: string, from: string, to: string): string {
  if (from === "") return input
  let out = ""
  let i = 0
  while (i < input.length) {
    const next = input.indexOf(from, i)
    if (next < 0) {
      out += input.slice(i)
      break
    }
    out += input.slice(i, next) + to
    i = next + from.length
  }
  return out
}
