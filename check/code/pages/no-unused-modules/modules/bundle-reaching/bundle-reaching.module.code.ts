import { relative } from "node:path"
import type { Paged } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import {
  placingOver,
  readingOf,
  typingOver,
} from "akasha/code/reading/modules/code-typing/code-typing.module.code.ts"
import { computeReachability } from "akasha/design/language/lua-compiler/modules/transpile-reachability/transpile-reachability.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { textAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const ADDON = "temper-addon"

const BUNDLE_ENTRY = "bundleEntry"

const MODULE = "module"

const CODE = "code"

const TS = "ts"

const APART = "/"

function slugIn(said: string): string {
  return said.slice(said.lastIndexOf(APART) + 1)
}

export function entriesIn(paged: Paged, holds: (path: string) => boolean): readonly string[] {
  const found = new Set<string>()
  for (const listed of paged.index.everyOfType(ADDON)) {
    const value = paged.index.pageByPath(listed.path)
    if (value === null) continue
    const said = textAt(value, BUNDLE_ENTRY)
    if (said === null) continue
    const page = paged.index.listedAt(MODULE, slugIn(said))[0]
    if (page === undefined) continue
    const code = besideAt(page.path, CODE, TS)
    if (code !== null && holds(code)) found.add(code)
  }
  return [...found].toSorted()
}

export function filesReached(
  root: string,
  listed: readonly string[],
  read: (path: string) => string | null,
  entries: readonly string[]
): ReadonlySet<string> {
  const found = new Set<string>()
  if (entries.length === 0) return found
  const placed = placingOver(listed, read)
  const typing = typingOver(root, entries, readingOf(root, read, placed), placed)
  for (const one of entries) {
    const source = typing.sourceAt(one)
    if (source === null) continue
    for (const file of computeReachability(typing.program, source).reachableFiles) {
      found.add(relative(root, file.fileName))
    }
  }
  return found
}
