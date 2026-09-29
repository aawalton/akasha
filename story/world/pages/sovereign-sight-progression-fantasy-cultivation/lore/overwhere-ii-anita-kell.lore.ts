import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIiAnitaKell = {
  id: "01a0ed20-5f39-788d-9d79-8bae605ab0bb",
  type: "page-type/lore",
  slug: "overwhere-ii-anita-kell",
  title: "Anita Kell",
  world: "world/sovereign-sight-progression-fantasy-cultivation",
  facts: [
    {
      fact: "Anita Kell is a young Chartermarked Aspirant from Runnel.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Anita's Talent is Eruption, Minor Scope, Surface Depth: a geyser from the ground, raining hot water.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Anita trained at the Sleeping Bear Inn in Creston while awaiting an escort south.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Anita was last in Creston with Sven and Johan, seeking Adhira to join them.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
