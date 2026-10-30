import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const giftedPolishWorldMelody = {
  id: "01a18e17-127d-78f6-8edc-09cf41982d41",
  type: "page-type/lore",
  slug: "gifted-polish-world-melody",
  title: "Melody",
  world: "world/gifted-polish-world",
  about: "world-character/gifted-polish-world-melody",
  facts: [
    {
      fact: "Melody is a Life Mage of the Shining Light Guild, a short woman of about thirty.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She healed the cut on the cult baby's throat, though the baby had lost much blood.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She carried the baby against her chest on the two-day ride up to the outpost.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She is quiet and gentle, and she called Falkon a babykiller to his face.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She brought the milk the cult had fed the baby, dripped from a sack.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-10-30T18:34:02.178Z",
  updatedAt: "2026-10-30T18:34:02.178Z",
} as const satisfies Lore
