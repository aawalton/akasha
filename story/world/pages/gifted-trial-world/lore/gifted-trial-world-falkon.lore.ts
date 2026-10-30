import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const giftedTrialWorldFalkon = {
  id: "01a18d10-93f1-791a-93c1-5617bc4e3630",
  type: "page-type/lore",
  slug: "gifted-trial-world-falkon",
  title: "Falkon",
  world: "world/gifted-trial-world",
  about: "world-character/gifted-trial-world-falkon",
  facts: [
    {
      fact: "Falkon is a thin tracker who keeps his Guild a secret, hired for the cult job alone.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He killed the cult's mother with a dagger through the eye as she cut her baby's throat.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He believes the cult's baby is a demon and drew a dagger to kill it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He was kept from the baby, and he does not know where it was taken.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He hates the baby still, and swore the others were letting evil fester.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-10-30T13:47:19.494Z",
  updatedAt: "2026-10-30T13:47:19.494Z",
} as const satisfies Lore
