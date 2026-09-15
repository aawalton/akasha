import { basename, dirname, join } from "node:path"
import { besideAt, partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import {
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const SECTION = "referenced-by"

const HOLDS = "jsonl"

const PAGE_HOLDS = ".ts"

const ENDING = `.${SECTION}.${HOLDS}`

export const IMPORT = "import"

export type Reference = {
  readonly propertySlug: string
  readonly fileName: string | null
  readonly path: string
  readonly id: string | null
}

export function referencesAt(pagePath: string): string | null {
  return besideAt(pagePath, SECTION, HOLDS)
}

export function referencesFiled(path: string): boolean {
  return path.endsWith(ENDING)
}

export function ownerOf(path: string): string | null {
  const said = partedIn(path)
  if (said === null) return null
  return join(dirname(path), `${said.slug}.${said.pageType}${PAGE_HOLDS}`)
}

export function fileNameOf(path: string): string {
  return basename(path)
}

export function referenceIn(line: string): Reference | null {
  let said: unknown
  try {
    said = JSON.parse(line)
  } catch {
    return null
  }
  if (said === null || typeof said !== "object" || Array.isArray(said)) return null
  const held = said as Value
  const propertySlug = textAt(held, "propertySlug")
  const path = textAt(held, "path")
  if (propertySlug === null || path === null) return null
  return { propertySlug, fileName: textAt(held, "fileName"), path, id: textAt(held, "id") }
}

export function referencesEach(lines: Iterable<string>): readonly Reference[] {
  const found: Reference[] = []
  for (const line of lines) {
    const one = referenceIn(line)
    if (one !== null) found.push(one)
  }
  return found
}

export function lineOf(one: Reference): string {
  const said: Record<string, string> = { propertySlug: one.propertySlug }
  if (one.fileName !== null) said.fileName = one.fileName
  said.path = one.path
  if (one.id !== null) said.id = one.id
  return JSON.stringify(said)
}

export function bodyOf(references: readonly Reference[]): string {
  const lines = [...new Set(references.map(lineOf))].sort()
  if (lines.length === 0) return ""
  return `${lines.join("\n")}\n`
}
