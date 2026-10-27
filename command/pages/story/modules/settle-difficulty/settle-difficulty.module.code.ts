import {
  listedAt,
  listedFor,
  valueByPath,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { addressedIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"

import { difficultyMoved } from "akasha/story/world/mechanics/checks/properties/difficulty-moved.boolean-property.ts"
import { worldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.ts"
import type { Rolled } from "akasha/story/world/mechanics/modules/dice-reading/dice-reading.module.code.ts"
import { difficultyLevel } from "akasha/story/world/stories/played/difficulty-levels/difficulty-level.page-type.ts"
import { oddsModifier } from "akasha/story/world/stories/played/difficulty-levels/properties/odds-modifier.number-property.ts"
import { levelUnnamed } from "akasha/story/world/stories/played/modules/difficulty-unnamed/difficulty-unnamed.module.code.ts"
import { difficulty } from "akasha/story/world/stories/played/properties/difficulty.relation-property.ts"
import { storyPlayed } from "akasha/story/world/stories/played/story-played.page-type.ts"

const MOVED = exportedAs(difficultyMoved.propertySlug)

const NAMED = exportedAs(difficulty.propertySlug)

const MODIFIER = exportedAs(oddsModifier.propertySlug)

const SLUG = "slug"

export type Odds = { readonly level: string; readonly by: number }

export type Oddsed = { readonly answered: Odds | null } | { readonly refused: string }

function moves(root: string, check: string): boolean {
  const listed = listedAt(root, worldCheck.slug, check)[0]
  return listed !== undefined && valueByPath(root, listed.path)?.[MOVED] === true
}

function levelNamed(root: string, story: string): unknown {
  const listed = listedAt(root, storyPlayed.slug, story)[0]
  const named = listed === undefined ? undefined : valueByPath(root, listed.path)?.[NAMED]
  return named ?? levelUnnamed()
}

export function oddsIndexed(root: string, story: string, check: string): Oddsed {
  if (!moves(root, check)) return { answered: null }
  const named = levelNamed(root, story)
  if (typeof named !== "string") return { refused: `\`${story}\` names no difficulty level` }
  const address = addressedIn(named)
  if ("refused" in address) return address
  const listed = listedFor(root, address)
  const value = listed === null ? null : valueByPath(root, listed.path)
  const by = value?.[MODIFIER]
  const slug = value?.[SLUG]
  if (typeof by !== "number" || typeof slug !== "string") {
    return { refused: `\`${named}\`, the difficulty level of \`${story}\`, is no page here` }
  }
  return { answered: { level: `${difficultyLevel.slug}/${slug}`, by } }
}

export function rolledBy(roll: Rolled, odds: Odds | null): Rolled {
  return odds === null ? roll : { ...roll, total: roll.total + odds.by }
}
