import { readdirSync } from "node:fs"
import { basename, dirname, join } from "node:path"
import { isMissing } from "../missing/missing.ts"

export const PART_CEILING_BYTES = 8 * 1024 * 1024

const SUFFIX = ".jsonl"

const UNCOMMITTED_SUFFIX = ".uncommitted.jsonl"

const ROWS = /\.[a-z0-9-]+(?:\.part\d+)?(?:\.uncommitted)?\.jsonl$/

const PART = /\.part(\d+)(?:\.uncommitted)?\.jsonl$/

/** What `rowsPartOf` leaves on a stem, to be taken back off it. */
const PART_ON_STEM = /\.part\d+$/

/** A stem's last dotted segment, which is the key, and everything before it, which is the page. */
const KEYED = /^(.*)\.([a-z0-9-]+)$/

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

/** What a rows sidecar's name states. */
export type RowsNaming = {
  /** The path of the page it stands beside, without the `.md` — what `rowsFileOf` was handed. */
  readonly page: string
  /** The property on that page's type whose rows this holds — what `rowsFileOf` was handed as `key`. */
  readonly key: string
  /** Which part of the sidecar this file is. Part one is the unsuffixed file, so this is never 0. */
  readonly part: number
}

/**
 * What one rows sidecar's name states, or nothing where the name states no sidecar.
 *
 * THE KEY IS THE STEM'S LAST SEGMENT ONCE EVERY SUFFIX THE WRITER ADDS IS OFF IT. Two go on above
 * the key: `rowsPartOf` adds `.partN` and `rowsFileOf` adds `.uncommitted`, in that order, so they
 * come off in the other one. A reader that instead takes the segment before `.jsonl` reads the key
 * of `a.items.part10.jsonl` as `part10` and of `a.lines.uncommitted.jsonl` as `uncommitted`, and
 * both spellings match the shape a key is written in, so neither is caught as a name it could not
 * parse — it goes looking for a property nothing declares and answers a sidecar it mis-read exactly
 * as it answers a path that is no sidecar at all.
 *
 * PART ONE HAS NO `.partN`, so a sidecar standing in N parts carries N-1 numbered names and the
 * unsuffixed one. Counting the numbered files is counting one part short.
 */
export function rowsNamingOf(relPath: string): RowsNaming | null {
  if (!relPath.endsWith(SUFFIX)) return null
  const split = KEYED.exec(stemOf(relPath).replace(PART_ON_STEM, ""))
  if (split === null) return null
  return { page: split[1] as string, key: split[2] as string, part: partNumberOf(relPath) }
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
