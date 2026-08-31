import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import {
  landingOf,
  specifiersIn,
} from "../../../code-system/code-specifier/code-specifier.module.code.ts"
import { standingByPath } from "../../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import { standingOf, type Warrant } from "../../warranting/warranting.module.code.ts"

export const IMPORTED =
  "A file leans on every file it imports, and what an import is held to is said on its page."

const TS = ".ts"

function textAt(root: string, path: string): string | null {
  const at = join(root, path)
  return existsSync(at) ? readFileSync(at, "utf8") : null
}

export function importedIn(root: string, path: string): readonly string[] {
  if (!path.endsWith(TS)) return []
  const text = textAt(root, path)
  if (text === null) return []
  const found = new Set<string>()
  for (const one of specifiersIn(path, text)) {
    const landed = landingOf(path, one)
    if (landed !== null) found.add(landed)
  }
  return [...found].sort()
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
