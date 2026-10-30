import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const giftedTrialWorldHorndaleMountains = {
  id: "01a18d10-93f1-7390-a7c8-9044a8380322",
  type: "page-type/place",
  slug: "gifted-trial-world-horndale-mountains",
  title: "Horndale Mountains",
  world: "world/gifted-trial-world",
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
  createdAt: "2026-10-30T13:47:19.494Z",
  updatedAt: "2026-10-30T13:47:19.494Z",
} as const satisfies Place
