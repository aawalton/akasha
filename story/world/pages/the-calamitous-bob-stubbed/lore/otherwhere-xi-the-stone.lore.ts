import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiTheStone = {
  id: "01a0ea89-57b6-7404-80b6-5f2e491a56fc",
  type: "page-type/lore",
  slug: "otherwhere-xi-the-stone",
  title: "The Stone",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-the-stone",
  facts: [
    {
      fact: "The Stone was an elder of the old Shaded Lands, long ago.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Stone rose against Kor the Baleful, the tyrant of Korrim who woke the volcano.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Stone is long dead; the tale is told among the Shadowlands' exiles.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
