import { claimsOf } from "@akasha/indexes/path-claiming"
import type { Value } from "@akasha/pages/page-value"
import type { World } from "../change-shadow/change-shadow.module.code.ts"

export function claimedIn(world: World, at: string, value: Value): readonly string[] {
  const claimed = claimsOf(
    value,
    at,
    world.root,
    world.index.filePropertiesAt(),
    world.index.sidecarsAt(),
    (one) => world.textOf(one) !== null
  )
  const held = [...new Set(claimed)].filter((one) => one !== at && world.textOf(one) !== null)
  return [at, ...held]
}
