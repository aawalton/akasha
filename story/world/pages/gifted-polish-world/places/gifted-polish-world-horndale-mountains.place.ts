import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const giftedPolishWorldHorndaleMountains = {
  id: "01a18e17-127d-7b7e-a07a-bad0fa5cf24b",
  type: "page-type/place",
  slug: "gifted-polish-world-horndale-mountains",
  title: "Horndale Mountains",
  world: "world/gifted-polish-world",
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
  createdAt: "2026-10-30T18:34:02.178Z",
  updatedAt: "2026-10-30T18:34:02.178Z",
} as const satisfies Place
