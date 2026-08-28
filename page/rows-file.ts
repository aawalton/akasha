import { readdirSync } from "node:fs"
import { basename, dirname, join } from "node:path"
import { isMissing } from "../missing/missing.ts"

export const PART_CEILING_BYTES = 8 * 1024 * 1024

const SUFFIX = ".jsonl"

const UNCOMMITTED_SUFFIX = ".uncommitted.jsonl"

const ROWS = /\.[a-z0-9-]+(?:\.part\d+)?(?:\.uncommitted)?\.jsonl$/

const PART = /\.part(\d+)(?:\.uncommitted)?\.jsonl$/

function suffixOf(rowsPath: string): string {
  return rowsPath.endsWith(UNCOMMITTED_SUFFIX) ? UNCOMMITTED_SUFFIX : SUFFIX
}

function stemOf(rowsPath: string): string {
  const suffix = suffixOf(rowsPath)
  return rowsPath.slice(0, -suffix.length)
}

export function isRowsFile(relPath: string): boolean {
  return ROWS.test(relPath)
}

export function rowsFileOf(relPath: string, key: string, uncommitted = false): string {
  const stem = relPath.replace(/\.md$/, "")
  return `${stem}.${key}${uncommitted ? UNCOMMITTED_SUFFIX : SUFFIX}`
}

export function rowsPartOf(rowsPath: string, part: number): string {
  return part <= 1 ? rowsPath : `${stemOf(rowsPath)}.part${part}${suffixOf(rowsPath)}`
}

export function partNumberOf(rowsPath: string): number {
  const found = PART.exec(rowsPath)
  return found === null ? 1 : Number(found[1])
}

function quoted(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

/**
 * AN EMPTY LIST MEANS THE DIRECTORY HOLDS NO PART OF THIS SIDECAR, and callers act on exactly that:
 * `partsHeld` falls back to the base path and `writeOutParts` then rewrites that one file whole. So
 * an unreadable directory answered as an empty one does not merely lose the parts, it overwrites
 * part one with whatever the caller was adding and drops every other part from the sidecar.
 *
 * A directory that is not there is a true empty — the page has no sidecar yet, and the first write
 * makes it. Any other failure raises, because it says nothing about how many parts stand there.
 */
export function rowsPartsOf(rowsPath: string): readonly string[] {
  const dir = dirname(rowsPath)
  const suffix = suffixOf(rowsPath)
  const stem = basename(stemOf(rowsPath))
  let names: readonly string[]
  try {
    names = readdirSync(dir)
  } catch (thrown) {
    if (!isMissing(thrown)) throw thrown
    return []
  }
  const shape = new RegExp(`^${quoted(stem)}\\.part(\\d+)${quoted(suffix)}$`)
  const found: { readonly at: number; readonly name: string }[] = []
  for (const name of names) {
    if (name === `${stem}${suffix}`) {
      found.push({ at: 1, name })
      continue
    }
    const numbered = shape.exec(name)
    if (numbered !== null) found.push({ at: Number(numbered[1]), name })
  }
  return found.sort((one, two) => one.at - two.at).map((one) => join(dir, one.name))
}
