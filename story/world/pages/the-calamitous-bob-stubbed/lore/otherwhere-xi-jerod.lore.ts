import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiJerod = {
  id: "01a0ea89-b5cf-72b9-8463-e4d54852783b",
  type: "page-type/lore",
  slug: "otherwhere-xi-jerod",
  title: "Jerod",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-jerod",
  facts: [
    {
      fact: "Sergeant Jerod, called Old Three-Eyes, served in Captain Cernit's Baranese company.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Jerod is a vigilant scout but a bad archer.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Jerod marched with Viv through Baran's marches against Halluria years ago.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Where Jerod is this season is unknown.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
