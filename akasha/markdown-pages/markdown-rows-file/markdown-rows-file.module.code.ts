import { readdirSync } from "node:fs"
import { basename, dirname, join } from "node:path"
import { besideAt } from "@akasha/pages-system/page-file-name"
import { isMissing } from "@akasha/utils-fs/missing"

const SUFFIX = ".jsonl"

const UNCOMMITTED_SUFFIX = ".uncommitted.jsonl"

const ROWS = /\.[a-z0-9-]+(?:\.part\d+)?(?:\.uncommitted)?\.jsonl$/

const PART = /\.part(\d+)(?:\.uncommitted)?\.jsonl$/

const PART_ON_STEM = /\.part\d+$/

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

/**
 * The file the rows of one property stand in, beside the page that names them.
 *
 * A markdown page drops `.md` and takes the key and the suffix. An akasha page is a `.ts` file and
 * drops `.ts` the same way — but that rule is akasha's own and is stated once, in `besideAt`, which
 * the day pages, the fidelity checker and the landing all already read their sidecar names from.
 * Restating it here is how the two halves of one corpus come to disagree about where a row is, so
 * this asks `besideAt` and falls back to the markdown rule only where `besideAt` will not answer.
 */
export function rowsFileOf(relPath: string, key: string, uncommitted = false): string {
  const suffix = uncommitted ? UNCOMMITTED_SUFFIX : SUFFIX
  const beside = besideAt(relPath, key, suffix.slice(1))
  if (beside !== null) return beside
  return `${relPath.replace(/\.md$/, "")}.${key}${suffix}`
}

export function rowsPartOf(rowsPath: string, part: number): string {
  return part <= 1 ? rowsPath : `${stemOf(rowsPath)}.part${part}${suffixOf(rowsPath)}`
}

export function partNumberOf(rowsPath: string): number {
  const found = PART.exec(rowsPath)
  return found === null ? 1 : Number(found[1])
}

export type RowsNaming = {
  readonly page: string
  readonly key: string
  readonly part: number
}

export function rowsNamingOf(relPath: string): RowsNaming | null {
  if (!relPath.endsWith(SUFFIX)) return null
  const split = KEYED.exec(stemOf(relPath).replace(PART_ON_STEM, ""))
  if (split === null) return null
  return { page: split[1] as string, key: split[2] as string, part: partNumberOf(relPath) }
}

function quoted(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

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
