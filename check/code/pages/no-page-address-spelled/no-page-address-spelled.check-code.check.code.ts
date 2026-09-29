import {
  pathsSearched,
  TYPED_KINDS,
} from "akasha/change/modules/tree-searching/tree-searching.module.code.ts"
import {
  found,
  judgingFor,
} from "akasha/check/code/pages/no-page-address-spelled/no-page-address-spelled.check-code.decision.code.ts"
import {
  judgingEach,
  pageTypesFor,
  TEXTS,
  textIn,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { pageNamed, partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"

const carried = judgingEach(TEXTS, (given, shadow) =>
  found(judgingFor(shadow), given.path, given.text)
)

function addressesArriving(change: Change, pageTypes: ReadonlySet<string>): readonly string[] {
  const said: string[] = []
  for (const path of change.changed) {
    if (!pageNamed(path, pageTypes) || change.before(path) !== null) continue
    if (change.after(path) === null) continue
    const parted = partedIn(path)
    if (parted !== null) said.push(`${parted.pageType}/${parted.slug}`)
  }
  return said.sort()
}

function spelledBefore(change: Change, shadow: Shadow): readonly Judged[] {
  const asked = addressesArriving(change, pageTypesFor(shadow))
  if (asked.length === 0) return []
  const changed = new Set(change.changed)
  const said: Judged[] = []
  for (const path of pathsSearched(change.root, asked, TYPED_KINDS).toSorted()) {
    if (changed.has(path)) continue
    const text = textIn(change, path)
    if (text === null) continue
    for (const reason of found(judgingFor(shadow), path, text)) said.push({ path, reason })
  }
  return said
}

export const noPageAddressSpelled = Object.assign(
  (change: Change, shadow: Shadow): readonly Judged[] => [
    ...carried(change, shadow),
    ...spelledBefore(change, shadow),
  ],
  { isInput: carried.isInput }
)
