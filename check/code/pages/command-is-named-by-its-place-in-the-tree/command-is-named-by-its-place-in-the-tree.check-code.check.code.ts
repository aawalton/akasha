import type { Kinds } from "akasha/check/code/pages/command-is-named-by-its-place-in-the-tree/command-is-named-by-its-place-in-the-tree.check-code.decision.code.ts"
import {
  COMMANDS,
  judgingBy,
  kindsFor,
  namedAt,
  PARTS,
  partsIn,
  placingBy,
  treeUnder,
} from "akasha/check/code/pages/command-is-named-by-its-place-in-the-tree/command-is-named-by-its-place-in-the-tree.check-code.decision.code.ts"
import type {
  Paged,
  Selector,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import {
  input,
  PAGES,
  pagesBy,
  textIn,
  textNamed,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { filedById, reaches } from "akasha/page/index/modules/reaching/reaching.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { pageNamed } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"
import { valueIn } from "akasha/page/modules/value/page-value.module.code.ts"
import { textAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const ID = "id"

const kindsHeld = new WeakMap<Shadow, Kinds>()

function kindsFrom(shadow: Shadow): Kinds {
  const found = kindsHeld.get(shadow)
  if (found !== undefined) return found
  const made = kindsFor(shadow)
  kindsHeld.set(shadow, made)
  return made
}

function ours(path: string, shadow: Shadow): boolean {
  return path.startsWith(`${COMMANDS}/`) || namedAt(path, kindsFrom(shadow)) !== null
}

function bodied(path: string): boolean {
  return textNamed(path) && path.startsWith(`${COMMANDS}/`)
}

const OURS: Selector<Paged> = {
  ...pagesBy(
    "the pages and the TypeScript under `command/`, and commands and namespaces wherever they sit",
    ours
  ),
  isInput: (path, shadow) => (PAGES.isInput(path, shadow) && ours(path, shadow)) || bodied(path),
}

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  const pageTypes = shadow.index.pageTypesIn()
  const kinds = kindsFrom(shadow)
  const known = shadow.index.knownIn()
  const wanted = known.targetOf(PARTS)
  const judging = judgingBy(shadow, kinds)
  const said: Judged[] = []
  const judged = new Set<string>()
  const judge = (path: string, id: string): undefined => {
    if (judged.has(path)) return
    judged.add(path)
    const one = namedAt(path, kinds)
    if (one === null) return
    const reason = judging(id, path, one)
    if (reason !== null) said.push({ path, reason })
  }
  for (const path of change.changed) {
    if (!pageNamed(path, pageTypes)) continue
    const text = textIn(change, path)
    if (text === null) continue
    for (const shown of partsIn(valueIn(text))) {
      const reached = reaches(shown, wanted, known)
      if (!("id" in reached)) continue
      const listed = filedById(known, reached.id)
      if (listed !== null) judge(listed.path, reached.id)
    }
    const value = shadow.pageOf(path)
    const id = value === null ? null : textAt(value, ID)
    if (id !== null) judge(path, id)
  }
  const placing = placingBy(shadow, kinds)
  for (const path of treeUnder(shadow, kinds).modules) {
    if (judged.has(path)) continue
    judged.add(path)
    const reason = placing(path)
    if (reason !== null) said.push({ path, reason })
  }
  return said
}

export const commandIsNamedByItsPlaceInTheTree = input(OURS, refusalsIn)
