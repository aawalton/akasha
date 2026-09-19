import {
  refusing,
  type Said,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { editsOver } from "akasha/change/modules/page-property-splicing/page-property-splicing.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { carriedIn } from "akasha/change/modules/value-carrying/value-carrying.module.code.ts"

export type Asked = {
  readonly pageType: string
  readonly from: string
  readonly to: string
  readonly atMost?: number | null
}

export function copyPropertyOnEveryPage(world: World, given: Asked): Said {
  const held = carriedIn(world, given)
  if (typeof held === "string") return refusing(held)
  const made = editsOver(
    world,
    held.map((one) => ({
      path: one.path,
      written: [{ written: "put", key: given.to, value: one.value, after: given.from } as const],
    }))
  )
  return typeof made === "string" ? refusing(made) : stating(made)
}

export function runChange(world: World, given: Asked): Said {
  return copyPropertyOnEveryPage(world, given)
}
