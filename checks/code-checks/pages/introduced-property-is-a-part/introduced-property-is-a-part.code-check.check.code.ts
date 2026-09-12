import {
  everyType,
  PAGE_TYPE,
  refusalsOver,
  sourceOf,
  typeNamedIn,
} from "akasha/checks/code-checks/pages/introduced-property-is-a-part/introduced-property-is-a-part.code-check.decision.code.ts"
import { carriedBy } from "akasha/checks/code-checks/pages/relation-resolves/relation-resolves.code-check.decision.code.ts"
import {
  input,
  pagesTailed,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import type { Change } from "akasha/pages/modules/change/change.module.code.ts"
import type { Shadow } from "akasha/pages/shadow/shadow.module.code.ts"

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  if (!change.changed.some((path) => typeNamedIn(path) !== null)) return []
  const carried = carriedBy(change, shadow.index.pageTypesIn())
  const types = everyType(shadow, carried)
  return refusalsOver(types, sourceOf(types, shadow.index.sourceIn()))
}

export const introducedPropertyIsAPart = input(pagesTailed(PAGE_TYPE), refusalsIn)
