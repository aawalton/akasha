import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const giftedPolishWorldFalkon = {
  id: "01a18e17-127d-7875-a293-6a64693dcb5f",
  type: "page-type/lore",
  slug: "gifted-polish-world-falkon",
  title: "Falkon",
  world: "world/gifted-polish-world",
  about: "world-character/gifted-polish-world-falkon",
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
  createdAt: "2026-10-30T18:34:02.178Z",
  updatedAt: "2026-10-30T18:34:02.178Z",
} as const satisfies Lore
