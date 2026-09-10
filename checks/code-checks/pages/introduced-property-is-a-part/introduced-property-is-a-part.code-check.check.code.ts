import type { Change } from "@akasha/pages/change"
import type { Shadow } from "@akasha/pages/shadow"
import { input, pagesTailed } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { carriedBy } from "../relation-resolves/relation-resolves.code-check.decision.code.ts"
import {
  everyType,
  PAGE_TYPE,
  refusalsOver,
  sourceOf,
  typeNamedIn,
} from "./introduced-property-is-a-part.code-check.decision.code.ts"

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  if (!change.changed.some((path) => typeNamedIn(path) !== null)) return []
  const carried = carriedBy(change, shadow.index.pageTypesIn())
  const types = everyType(shadow, carried)
  return refusalsOver(types, sourceOf(types, shadow.index.sourceIn()))
}

export const introducedPropertyIsAPart = input(pagesTailed(PAGE_TYPE), refusalsIn)
