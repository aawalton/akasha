import {
  landingOf,
  NAMING_NONE,
  type Naming,
  specifiersIn,
} from "@akasha/code-system/code-specifier"
import { typed } from "@akasha/code-system/code-typing"
import { listedByPath } from "@akasha/indexes"
import { bodiesAt, reachingFor } from "@akasha/indexes/package-reaching"
import { blobAt, type Warrant } from "../../modules/warranting/warranting.module.code.ts"

export const IMPORTED =
  "A file leans on every file it imports, and what an import is held to is said on its page."

export function importedIn(
  root: string,
  path: string,
  naming: Naming = NAMING_NONE
): readonly string[] {
  if (!typed(path)) return []
  const text = bodiesAt(root)(path)
  if (text === null) return []
  const found = new Set<string>()
  for (const one of specifiersIn(path, text)) {
    const landed = landingOf(path, one, naming)
    if (landed !== null) found.add(landed)
  }
  return [...found].sort()
}

export function pageOf(root: string, path: string): string | null {
  return listedByPath(root, path)[0]?.path ?? null
}

export function fileImport(root: string, path: string): readonly Warrant[] {
  const found: Warrant[] = []
  const held = new Set<string>([path])
  for (const one of importedIn(root, path, reachingFor(root))) {
    const page = pageOf(root, one)
    if (page === null || held.has(page)) continue
    held.add(page)
    const oid = blobAt(root, page)
    if (oid === null) continue
    found.push({ path: page, oid: oid, owed: IMPORTED })
  }
  return found
}
