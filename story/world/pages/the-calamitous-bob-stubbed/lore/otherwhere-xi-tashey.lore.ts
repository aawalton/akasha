import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiTashey = {
  id: "01a0ea8a-26e4-77a2-b007-9207456d70f7",
  type: "page-type/lore",
  slug: "otherwhere-xi-tashey",
  title: "Tashey",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-tashey",
  facts: [
    {
      fact: "Tashey, also Teysha, is an administrative representative of the Academy of Helock.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Tashey is among the Academy's scattered staff, since Oleander took Helock.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
