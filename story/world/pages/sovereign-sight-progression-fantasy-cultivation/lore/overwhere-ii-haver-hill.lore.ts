import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIiHaverHill = {
  id: "01a0ed30-1531-79fd-908d-f5bd975e3f16",
  type: "page-type/lore",
  slug: "overwhere-ii-haver-hill",
  title: "Haver Hill",
  world: "world/sovereign-sight-progression-fantasy-cultivation",
  facts: [
    {
      fact: "Haver Hill is a walled hilltop town of timber houses, south of Vale and smaller than it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Haver Hill is known for its dyed rugs, and bullhounds pull its wagons.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Grim Company hunters who came to Vale arrived by way of Haver Hill.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Near Haver Hill lies a large beast's den with deep claw marks, long empty.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "South of Haver Hill lie Runnel to the west and Creston to the east; the rest is wild land.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
