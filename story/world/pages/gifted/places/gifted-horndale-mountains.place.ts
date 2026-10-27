import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const giftedHorndaleMountains = {
  id: "01a17edb-c5d9-749c-b98f-ff98b776bf1d",
  type: "page-type/place",
  slug: "gifted-horndale-mountains",
  title: "Horndale Mountains",
  world: "world/gifted",
  depth: 0,
  facts: [
    {
      fact: "The Horndale Mountains part Meravia in the west from Ajinar in the east.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Giant Horndale pines cover the slopes below the snowline.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Storm eagles, mountain trolls, coldfang serpents and Horndale bears live in the heights.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Goblin tribes live in the north of the range.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The northern Horndale is claimed by no lord, so no tax collector climbs to it.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-10-27T19:34:54.679Z",
  updatedAt: "2026-10-27T19:34:54.679Z",
} as const satisfies Place
