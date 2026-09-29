import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiTarn = {
  id: "01a0ea8a-26e4-7049-9434-3496537b8077",
  type: "page-type/lore",
  slug: "otherwhere-xi-tarn",
  title: "Tarn",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-tarn",
  facts: [
    {
      fact: "Sergeant Tarn is a tactless Baranese sergeant who served under Captain Cernit.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tarn marched with Viv through Baran's northern marches against the Hallurians.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Tarn serves in Baran, a kingdom torn by civil war.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
