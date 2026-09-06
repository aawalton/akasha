import { claimsOf } from "@akasha/indexes/entries"
import type { Value } from "@akasha/pages/page-value"
import type { World } from "../change-shadow/change-shadow.module.code.ts"

// The page's own file leads the list, so a change carrying the files or taking the files away acts
// on the page before the files the page claims. The world is read rather than the disk, so a change
// sees what an earlier change in the same run left. An index that will not answer throws out of
// here, because a short list reads as a page claiming nothing.
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
