import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const giftedFalkon = {
  id: "01a17edc-e1bc-7556-b38e-1ea905b74441",
  type: "page-type/lore",
  slug: "gifted-falkon",
  title: "Falkon",
  world: "world/gifted",
  about: "world-character/gifted-falkon",
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
  createdAt: "2026-10-27T19:36:07.354Z",
  updatedAt: "2026-10-27T19:36:07.354Z",
} as const satisfies Lore
