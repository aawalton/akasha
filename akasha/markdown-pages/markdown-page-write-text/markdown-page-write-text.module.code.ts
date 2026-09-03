import { existsSync, readFileSync, writeFileSync } from "node:fs"
import { parse } from "yaml"
import type { FileTree } from "../markdown-file-tree/markdown-file-tree.module.code.ts"
import {
  type Rendered,
  withoutDefaults,
} from "../markdown-page-property-types/markdown-page-property-types.module.code.ts"

function readsBackAsWritten(one: string): boolean {
  let parsed: unknown
  try {
    parsed = parse(`v: ${one}\n`)
  } catch {
    return false
  }
  if (typeof parsed !== "object" || parsed === null) return false
  return (parsed as Record<string, unknown>).v === one
}

function quoted(one: string): string {
  const bare = /^[A-Za-z0-9][A-Za-z0-9 ._@/-]*$/.test(one) && readsBackAsWritten(one)
  return bare ? one : JSON.stringify(one)
}

function shown(one: string | number | boolean): string {
  return typeof one === "string" ? quoted(one) : String(one)
}

function lineFor(key: string, value: Rendered): readonly string[] {
  if (Array.isArray(value)) {
    return value.length === 0 ? [] : [`${key}:`, ...value.map((one) => `  - ${shown(one)}`)]
  }
  return [`${key}: ${shown(value as string | number | boolean)}`]
}

export function bodyFor(pageType: string, values: Readonly<Record<string, Rendered>>): string {
  const lines = ["---", `page-type-slug: ${pageType}`]
  for (const [key, value] of Object.entries(values)) {
    if (key === "page-type-slug") continue
    lines.push(...lineFor(key, value as Rendered))
  }
  lines.push("---", "")
  return lines.join("\n")
}

export function statedIn(text: string): Record<string, unknown> {
  if (!text.startsWith("---\n")) return {}
  const closesAt = text.indexOf("\n---", 3)
  if (closesAt < 0) return {}
  const parsed: unknown = parse(text.slice(4, closesAt + 1))
  return typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)
    ? (parsed as Record<string, unknown>)
    : {}
}

export function bodyIn(text: string): string {
  if (!text.startsWith("---\n")) return ""
  const closesAt = text.indexOf("\n---", 3)
  return closesAt < 0 ? "" : text.slice(closesAt + 4).replace(/^\n/, "")
}

export function textIn(path: string): string {
  try {
    return readFileSync(path, "utf8")
  } catch {
    return ""
  }
}

export function rewritten(path: string, contents: string): boolean {
  if (existsSync(path) && textIn(path) === contents) return false
  writeFileSync(path, contents, "utf8")
  return true
}

export function frontOf(
  tree: FileTree,
  pageType: string,
  front: Readonly<Record<string, Rendered>>
): string {
  return bodyFor(pageType, withoutDefaults(tree, pageType, front))
}
