import { parseFrontmatter } from "../frontmatter.ts"

export interface Manifest {
  readonly declared: boolean
  readonly slugs: readonly string[]
  readonly violations: readonly string[]
}

function shown(value: unknown): string {
  const text = typeof value === "string" ? value : (JSON.stringify(value) ?? String(value))
  return `\`${text.length > 60 ? `${text.slice(0, 60)}…` : text}\``
}

export function manifestOf(body: string, key: string, noun: string): Manifest {
  const fm = parseFrontmatter(body)
  const raw = fm.fields.get(key) ?? null
  const violations: string[] = []
  if (fm.error !== null) violations.push(`the frontmatter block could not be read — ${fm.error}`)
  const blocks: readonly unknown[] =
    typeof raw === "string" ? (raw.trim() === "" ? [] : [raw]) : Array.isArray(raw) ? raw : []
  if (raw !== null && !Array.isArray(raw) && typeof raw !== "string") {
    violations.push(`\`${key}:\` holds ${shown(raw)} — a manifest is one ${noun}'s slug, or a list of them`)
  }
  const slugs: string[] = []
  blocks.forEach((block, at) => {
    if (typeof block === "string" && block.trim() !== "") {
      slugs.push(block.trim())
      return
    }
    violations.push(
      `entry ${at + 1} of \`${key}:\` is ${shown(block)} — an entry is one ${noun}'s slug, and a manifest has no altitude to nest by`
    )
  })
  return { declared: fm.fields.has(key), slugs, violations }
}

export const REQUIRED_READING_KEY = "required-reading-slugs"

export const SEQUENCE_KEY = "sequence-slugs"

export const requiredReadingManifestOf = (body: string): Manifest =>
  manifestOf(body, REQUIRED_READING_KEY, "term")

export const sequenceManifestOf = (body: string): Manifest => manifestOf(body, SEQUENCE_KEY, "member")
