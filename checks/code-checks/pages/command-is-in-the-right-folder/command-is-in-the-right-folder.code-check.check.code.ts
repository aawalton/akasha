import type { Change } from "akasha/pages/change/change.module.code.ts"
import { namedUnder, pageNamed } from "akasha/pages/file-name/page-file-name.module.code.ts"
import type { Shadow } from "akasha/pages/shadow/shadow.module.code.ts"
import type { Paged, Selector } from "../../../modules/change-walking/change-walking.module.code.ts"
import { input, PAGES } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { judgingBy, kindsFor } from "./command-is-in-the-right-folder.code-check.decision.code.ts"

const kindsHeld = new WeakMap<Shadow, ReadonlySet<string>>()

function kindsFrom(shadow: Shadow): ReadonlySet<string> {
  const found = kindsHeld.get(shadow)
  if (found !== undefined) return found
  const made = kindsFor(shadow)
  kindsHeld.set(shadow, made)
  return made
}

function ours(path: string, shadow: Shadow): boolean {
  return namedUnder(path, kindsFrom(shadow)) !== null
}

const OURS: Selector<Paged> = {
  named: "commands and namespaces",
  isInput: (path, shadow) => PAGES.isInput(path, shadow) && ours(path, shadow),
  from: (change, shadow) => PAGES.from(change, shadow).filter((one) => ours(one.path, shadow)),
}

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  const pageTypes = shadow.index.pageTypesIn()
  const judging = judgingBy(shadow)
  const said: Judged[] = []
  for (const path of change.changed) {
    if (!pageNamed(path, pageTypes)) continue
    if (change.after(path) === null) continue
    const one = namedUnder(path, kindsFrom(shadow))
    if (one === null) continue
    const filed = shadow.index.listedByPath(path).find((each) => each.path === path)
    if (filed === undefined) continue
    const reason = judging(filed.id, path, one.slug)
    if (reason !== null) said.push({ path, reason })
  }
  return said
}

export const commandIsInTheRightFolder = input(OURS, refusalsIn)
