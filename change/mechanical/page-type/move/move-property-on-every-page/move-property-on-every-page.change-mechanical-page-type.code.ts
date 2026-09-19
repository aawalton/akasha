import {
  refusing,
  type Said,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  editsOver,
  type Page,
} from "akasha/change/modules/page-property-splicing/page-property-splicing.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import {
  type Carrying,
  carriedIn,
} from "akasha/change/modules/value-carrying/value-carrying.module.code.ts"

export type Asked = {
  readonly pageType: string
  readonly from: string
  readonly to: string
  readonly atMost?: number | null
}

export function inPlaceOf(one: Carrying, given: Asked): Page {
  return {
    path: one.path,
    written: [{ written: "put", key: given.to, value: one.value, insteadOf: given.from }],
  }
}

export function movePropertyOnEveryPage(world: World, given: Asked): Said {
  const held = carriedIn(world, given)
  if (typeof held === "string") return refusing(held)
  const made = editsOver(
    world,
    held.map((one) => inPlaceOf(one, given))
  )
  return typeof made === "string" ? refusing(made) : stating(made)
}

export function runChange(world: World, given: Asked): Said {
  return movePropertyOnEveryPage(world, given)
}
