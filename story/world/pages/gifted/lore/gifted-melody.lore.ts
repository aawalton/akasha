import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const giftedMelody = {
  id: "01a17edc-e1bc-77a1-b674-f8336cb6f621",
  type: "page-type/lore",
  slug: "gifted-melody",
  title: "Melody",
  world: "world/gifted",
  about: "world-character/gifted-melody",
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
  createdAt: "2026-10-27T19:36:07.354Z",
  updatedAt: "2026-10-27T19:36:07.354Z",
} as const satisfies Lore
