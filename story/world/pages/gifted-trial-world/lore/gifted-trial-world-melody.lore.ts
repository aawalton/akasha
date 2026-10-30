import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const giftedTrialWorldMelody = {
  id: "01a18d10-93f1-768c-a426-f72b5858b4a4",
  type: "page-type/lore",
  slug: "gifted-trial-world-melody",
  title: "Melody",
  world: "world/gifted-trial-world",
  about: "world-character/gifted-trial-world-melody",
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
  createdAt: "2026-10-30T13:47:19.494Z",
  updatedAt: "2026-10-30T13:47:19.494Z",
} as const satisfies Lore
