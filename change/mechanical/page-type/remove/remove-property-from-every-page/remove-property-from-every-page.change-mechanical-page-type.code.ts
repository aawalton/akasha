import {
  refusing,
  type Said,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  editsOver,
  type Written,
} from "akasha/change/modules/page-property-splicing/page-property-splicing.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { holdingIn } from "akasha/change/modules/value-carrying/value-carrying.module.code.ts"

export type Asked = {
  readonly pageType: string
  readonly key: string
  readonly atMost?: number | null
}

export function requiringIn(world: World, given: Asked): string | null {
  for (const kind of world.index.kindsUnder(given.pageType)) {
    const carried = world.index.propertiesIfNamed(kind)
    if (carried === null) continue
    if (carried.some((one) => one.key === given.key && one.required)) {
      return `a \`${kind}\` requires \`${given.key}\`, so taking it away is a retype`
    }
  }
  return null
}

export function removePropertyFromEveryPage(world: World, given: Asked): Said {
  const held = holdingIn(world, given)
  if (typeof held === "string") return refusing(held)
  if (held.length === 0) return refusing(`no \`${given.pageType}\` carries \`${given.key}\``)
  const required = requiringIn(world, given)
  if (required !== null) return refusing(required)
  const written: readonly Written[] = [{ written: "dropped", key: given.key }]
  const made = editsOver(
    world,
    held.map((path) => ({ path, written }))
  )
  return typeof made === "string" ? refusing(made) : stating(made)
}

export function runChange(world: World, given: Asked): Said {
  return removePropertyFromEveryPage(world, given)
}
