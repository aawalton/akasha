import type { OverwhereIiiTrait } from "akasha/story/world/pages/the-magpie-and-the-archmage-monster-evo-litrpg/stories/played/overwhere-iii/mechanics/traits/overwhere-iii-trait.page-type.types.ts"

export const overwhereIiiManaWeaver = {
  id: "01a0ed1d-a292-7f97-b192-ca95c4651f43",
  type: "page-type/overwhere-iii-trait",
  slug: "overwhere-iii-mana-weaver",
  title: "Mana Weaver",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  story: "story-played/overwhere-iii",
  description:
    "A trait that shows the world's mana currents and lets them pour into its bearer's workings.",
  ranks: ["Basic", "Novice", "Adept", "Expert", "Legend"],
  draw: 12,
  reachFeet: 60,
  strain: 1,
} as const satisfies OverwhereIiiTrait
