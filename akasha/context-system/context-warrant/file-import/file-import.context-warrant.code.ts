import { join } from "node:path"
import { indexImport } from "../../../pages-system/indexes/index/index-import/index-import.index.ts"
import {
  indexIn,
  standingByPath,
} from "../../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import {
  beneath,
  type Reading,
  readingAt,
} from "../../../pages-system/indexes/index-surface/index-surface.module.code.ts"
import { standingOf, type Warrant } from "../../warranting/warranting.module.code.ts"

export const IMPORTED =
  "A file leans on every file it imports, and what an import is held to is said on its page."

const IMPORT = indexImport.indexName

const PATH = "path"

const ENDING = ".jsonl"

function importedHere(reading: Reading, at: string, path: string): boolean {
  for (const line of reading.lines(at)) {
    const said = JSON.parse(line) as { readonly path?: unknown }
    if (said.path === path) return true
  }
  return false
}

function underneath(reading: Reading, at: string, said: string, path: string): readonly string[] {
  return reading.listing(at).flatMap((one) => {
    const held = beneath(at, one.name)
    if (one.directory) return underneath(reading, held, `${said}${one.name}/`, path)
    if (!one.name.endsWith(ENDING)) return []
    return importedHere(reading, held, path) ? [`${said}${one.name}`.slice(0, -ENDING.length)] : []
  })
}

export function importedIn(root: string, path: string): readonly string[] {
  return [...underneath(readingAt(indexIn(root)), join(IMPORT, PATH), "", path)].sort()
}

export function pageOf(root: string, path: string): string | null {
  return standingByPath(root, path)[0]?.path ?? null
}

export function fileImport(root: string, path: string): readonly Warrant[] {
  const found: Warrant[] = []
  const held = new Set<string>([path])
  for (const one of importedIn(root, path)) {
    const page = pageOf(root, one)
    if (page === null || held.has(page)) continue
    held.add(page)
    const standing = standingOf(root, page)
    if (standing === null) continue
    found.push({ path: page, oid: standing, owed: IMPORTED })
  }
  return found
}
