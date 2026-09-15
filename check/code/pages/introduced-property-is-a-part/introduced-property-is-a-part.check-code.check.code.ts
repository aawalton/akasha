import {
  everyType,
  PAGE_TYPE,
  refusalsOver,
  sourceOf,
  typeNamedIn,
} from "akasha/check/code/pages/introduced-property-is-a-part/introduced-property-is-a-part.check-code.decision.code.ts"
import { carriedBy } from "akasha/check/code/pages/relation-resolves/relation-resolves.check-code.decision.code.ts"
import {
  input,
  pagesTailed,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  if (!change.changed.some((path) => typeNamedIn(path) !== null)) return []
  const carried = carriedBy(change, shadow.index.pageTypesIn())
  const types = everyType(shadow, carried)
  return refusalsOver(types, sourceOf(types, shadow.index.sourceIn()))
}

export const introducedPropertyIsAPart = input(pagesTailed(PAGE_TYPE), refusalsIn)
