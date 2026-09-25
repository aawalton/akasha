import { sparingLately } from "akasha/check/code/pages/no-unused-exports/modules/recent-landing/recent-landing.module.code.ts"
import {
  entriesIn,
  filesReached,
} from "akasha/check/code/pages/no-unused-modules/modules/bundle-reaching/bundle-reaching.module.code.ts"
import { entriesDeclared } from "akasha/check/code/pages/no-unused-modules/modules/entry-declaring/entry-declaring.module.code.ts"
import {
  type Gathered,
  modulesIn,
} from "akasha/check/code/pages/no-unused-modules/modules/module-gathering/module-gathering.module.code.ts"
import { pathsNamed } from "akasha/check/code/pages/no-unused-modules/modules/path-spelling/path-spelling.module.code.ts"
import { slugsSpelled } from "akasha/check/code/pages/no-unused-modules/modules/slug-spelling/slug-spelling.module.code.ts"
import type { Paged } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import { textIn } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { uncommittedHeld } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"

const REACHED = "a module nothing reaches is code nothing runs"

type Whole = {
  readonly root: string
  readonly taken: readonly string[]
  readonly listed: readonly string[]
  readonly paged: Paged
  readonly read: (path: string) => string | null
  readonly holds: (path: string) => boolean
}

function importedFrom(paged: Paged, one: Gathered): boolean {
  const own = new Set(one.files)
  for (const file of one.files) {
    for (const importer of paged.index.importersOf(file)) {
      if (!own.has(importer)) return true
    }
  }
  return false
}

function unreachedIn(whole: Whole): readonly Gathered[] {
  const { root, listed, paged, read } = whole
  const gathered = modulesIn(whole.taken, listed, paged, read)
  const unimported = gathered.filter((one) => !importedFrom(paged, one))
  if (unimported.length === 0) return unimported
  const declared = entriesDeclared(read, unimported)
  const quiet = unimported.filter((one) => !declared.has(one.page))
  if (quiet.length === 0) return quiet
  const bundled = filesReached(root, listed, read, entriesIn(paged, whole.holds))
  const outside = quiet.filter((one) => !one.files.some((two) => bundled.has(two)))
  if (outside.length === 0) return outside
  const spelled = slugsSpelled(root, read, outside)
  const unspelled = outside.filter((one) => !spelled.has(one.slug))
  if (unspelled.length === 0) return unspelled
  const named = pathsNamed(root, read, unspelled)
  return unspelled.filter((one) => !named.has(one.page))
}

function reasonFor(one: Gathered): string {
  return (
    `no file imports \`${one.slug}\`, its code declares no entry point,` +
    ` no bundle entry point reaches it, no other file spells its slug` +
    ` and no file outside TypeScript names a file of it by path — ${REACHED}`
  )
}

function landedFilesOf(one: Gathered): readonly string[] {
  return one.files.filter((two) => !uncommittedHeld(two))
}

function sparingNew(root: string, found: readonly Gathered[], now: number): readonly Gathered[] {
  if (found.length === 0) return found
  const rows: Judged[] = []
  for (const one of found) {
    for (const file of landedFilesOf(one)) rows.push({ path: file, reason: one.page })
  }
  const kept = new Set(sparingLately(root, rows, now).map((one) => one.path))
  return found.filter((one) => {
    const held = landedFilesOf(one)
    return held.length > 0 && held.every((two) => kept.has(two))
  })
}

export function refusalsIn(whole: Whole, now: number = Date.now()): readonly Judged[] {
  return sparingNew(whole.root, unreachedIn(whole), now).map((one) => ({
    path: one.page,
    reason: reasonFor(one),
  }))
}

export function refusalsOver(
  change: Change,
  shadow: Shadow,
  now: number = Date.now()
): readonly Judged[] {
  return refusalsIn(
    {
      root: change.root,
      taken: change.changed,
      listed: shadow.listed(),
      paged: shadow,
      read: (path) => textIn(change, path),
      holds: (path) => shadow.holds(path),
    },
    now
  )
}
