import type { OverwhereIiiTrait } from "akasha/story/world/pages/the-magpie-and-the-archmage-monster-evo-litrpg/stories/played/overwhere-iii/mechanics/traits/overwhere-iii-trait.page-type.types.ts"

export const overwhereIiiInventory = {
  id: "01a0fe73-ee4f-7a7a-81fa-c817ccbbd187",
  type: "page-type/overwhere-iii-trait",
  slug: "overwhere-iii-inventory",
  title: "Inventory",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  story: "story-played/overwhere-iii",
  description: "A pocket space bound to its bearer, opened and emptied by thought.",
  ranks: ["Basic", "Novice", "Adept", "Expert", "Legend"],
} as const satisfies OverwhereIiiTrait
