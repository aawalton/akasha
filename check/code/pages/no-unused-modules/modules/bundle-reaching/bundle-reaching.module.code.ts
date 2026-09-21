import { relative } from "node:path"
import { textIn } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import {
  placingOver,
  readingOf,
  typingOver,
} from "akasha/code/reading/modules/code-typing/code-typing.module.code.ts"
import { computeReachability } from "akasha/design/language/lua-compiler/modules/transpile-reachability/transpile-reachability.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"
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

export function entriesIn(shadow: Shadow): readonly string[] {
  const found = new Set<string>()
  for (const listed of shadow.index.everyOfType(ADDON)) {
    const value = shadow.index.pageByPath(listed.path)
    if (value === null) continue
    const said = textAt(value, BUNDLE_ENTRY)
    if (said === null) continue
    const page = shadow.index.listedAt(MODULE, slugIn(said))[0]
    if (page === undefined) continue
    const code = besideAt(page.path, CODE, TS)
    if (code !== null && shadow.holds(code)) found.add(code)
  }
  return [...found].toSorted()
}

export function filesReached(
  change: Change,
  shadow: Shadow,
  entries: readonly string[]
): ReadonlySet<string> {
  const found = new Set<string>()
  if (entries.length === 0) return found
  const textOf = (path: string): string | null => textIn(change, path)
  const placed = placingOver(shadow.listed(), textOf)
  const typing = typingOver(change.root, entries, readingOf(change.root, textOf, placed), placed)
  for (const one of entries) {
    const source = typing.sourceAt(one)
    if (source === null) continue
    for (const file of computeReachability(typing.program, source).reachableFiles) {
      found.add(relative(change.root, file.fileName))
    }
  }
  return found
}
