import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXDistressBeacon = {
  id: "01a0ea7a-5bd9-774f-a1a5-c7b5beb8805c",
  type: "page-type/lore",
  slug: "otherwhere-x-distress-beacon",
  title: "Distress Beacon",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-item/otherwhere-x-distress-beacon",
  facts: [
    {
      fact: "A distress beacon is a jade stone whose runic carvings glow when it is activated.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The bearer activates it by pressing the center of the stone; bound hands cannot.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A beacon's signal lets guards find the bearer without knowing where the bearer is.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A beacon's signal can take hours to reach searching guards.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Nobles on expeditions and hunts carry distress beacons.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-09-29T00:04:42.585Z",
  updatedAt: "2026-09-29T00:04:46.000Z",
} as const satisfies Lore
