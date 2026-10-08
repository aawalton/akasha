import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVBirdfolk = {
  id: "01a0e9f3-7322-7b79-aafb-70403eb47d0e",
  type: "page-type/lore",
  slug: "otherwhere-v-birdfolk",
  title: "Birdfolk",
  world: "world/ends-of-magic",
  about: "world-species/otherwhere-v-birdfolk",
  facts: [
    {
      fact: "Birdfolk are one of Davrar's animal-peoples, with the look of birds.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Birdfolk are common in Keihona, among the most often seen nonhumans there.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Birdfolk in Keihona dress in much the same clothing as its human citizens.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-09-28T21:37:21.186Z",
  updatedAt: "2026-09-28T21:37:23.000Z",
} as const satisfies Lore
