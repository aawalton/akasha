import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { claimsOf } from "akasha/page/index/modules/path-claiming/path-claiming.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

export function claimedIn(world: World, at: string, value: Value): readonly string[] {
  const claimed = claimsOf(
    value,
    at,
    world.root,
    world.index.filePropertiesAt(),
    world.index.sidecarsAt(),
    world.index.uncommittedFiledAt(),
    (one) => world.bodyOf(one) !== null
  )
  const held = [...new Set(claimed)].filter((one) => one !== at && world.bodyOf(one) !== null)
  return [at, ...held]
}
