
import { frontmatter as readBlock } from "./document/frontmatter.ts"
import { Source } from "./document/position.ts"
import type { FrontmatterValue } from "./document/types.ts"

export interface Frontmatter {
  readonly present: boolean
  readonly fields: ReadonlyMap<string, unknown>
  readonly keys: readonly string[]
  readonly error: string | null
  readonly lineCount: number
}

const EMPTY: Frontmatter = {
  present: false,
  fields: new Map(),
  keys: [],
  error: null,
  lineCount: 0,
}

function plain(value: FrontmatterValue): unknown {
  if (value.kind === "scalar") return value.value.text
  if (value.kind === "list") return value.items.map(plain)
  return Object.fromEntries(value.entries.map((entry) => [entry.key.text, plain(entry.value)]))
}

export function parseFrontmatter(body: string): Frontmatter {
  const text = body.replace(/\r\n/g, "\n")
  if (!text.startsWith("---\n")) return EMPTY
  const source = Source(text)
  const { keys, below, unreadable } = readBlock(source)
  if (unreadable.length > 0) {
    const at = unreadable.map((span) => span.start.line).join(", ")
    return {
      ...EMPTY,
      present: true,
      lineCount: below,
      error: `line ${at} is not a key, a list item, or part of one`,
    }
  }
  const fields = new Map(keys.map((key) => [key.name, plain(key.value)]))
  return { present: true, fields, keys: keys.map((key) => key.name), error: null, lineCount: below }
}

export function textField(fm: Frontmatter, key: string): string | null {
  const value = fm.fields.get(key)
  if (typeof value !== "string") return null
  const trimmed = value.trim()
  return trimmed === "" ? null : trimmed
}

export function listField(fm: Frontmatter, key: string): readonly string[] {
  const value = fm.fields.get(key)
  if (typeof value === "string") return value.trim() === "" ? [] : [value.trim()]
  if (!Array.isArray(value)) return []
  return value.filter((v): v is string => typeof v === "string").map((v) => v.trim())
}
