import type { Kinds } from "akasha/checks/code-checks/pages/command-is-named-by-its-place-in-the-tree/command-is-named-by-its-place-in-the-tree.code-check.decision.code.ts"
import {
  COMMANDS,
  judgingBy,
  kindsFor,
  namedAt,
  PARTS,
  partsIn,
  placingBy,
  treeUnder,
} from "akasha/checks/code-checks/pages/command-is-named-by-its-place-in-the-tree/command-is-named-by-its-place-in-the-tree.code-check.decision.code.ts"
import type {
  Paged,
  Selector,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import {
  input,
  PAGES,
  textIn,
  textNamed,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import type { Change } from "akasha/pages/change/change.module.code.ts"
import { pageNamed } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { filedById, reaches } from "akasha/pages/indexes/reaching/reaching.module.code.ts"
import type { Shadow } from "akasha/pages/shadow/shadow.module.code.ts"
import { valueIn } from "akasha/pages/value/page-value.module.code.ts"

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
  named:
    "the pages and the TypeScript under `commands/`, and commands and namespaces wherever they sit",
  isInput: (path, shadow) => (PAGES.isInput(path, shadow) && ours(path, shadow)) || bodied(path),
  from: (change, shadow) => PAGES.from(change, shadow).filter((one) => ours(one.path, shadow)),
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
    const filed = shadow.index.listedByPath(path).find((each) => each.path === path)
    if (filed !== undefined) judge(path, filed.id)
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

export const commandIsInTheRightFolder = input(OURS, refusalsIn)
