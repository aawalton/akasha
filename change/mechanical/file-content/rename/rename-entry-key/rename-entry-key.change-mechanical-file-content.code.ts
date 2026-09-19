import {
  refusing,
  type Said,
  splicedIn,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { entrySpotted } from "akasha/change/modules/page-property-renaming/page-property-renaming.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

export function respelled(path: string, text: string, was: string, now: string): Said {
  const held = entrySpotted(path, text, was, now)
  if ("refused" in held) return refusing(held.refused)
  return stating(splicedIn(path, text, held.spots))
}

export type Given = {
  readonly at: string
  readonly was: string
  readonly now: string
}

export function runChange(world: World, given: Given): Said {
  const text = world.textOf(given.at)
  if (text === null) return refusing(`\`${given.at}\` holds no body, so no key is respelled`)
  return respelled(given.at, text, given.was, given.now)
}
