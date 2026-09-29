import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiJekk = {
  id: "01a0ea91-710e-789a-ac6f-9e9fa388b1c9",
  type: "page-type/lore",
  slug: "otherwhere-xi-jekk",
  title: "Jekk",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-jekk",
  facts: [
    {
      fact: "Jekk is a boat seller whom Viv once dealt with in her Academy years.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Where Jekk is this season is unknown.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
