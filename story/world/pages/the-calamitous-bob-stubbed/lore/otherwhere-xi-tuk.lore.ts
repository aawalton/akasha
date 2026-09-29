import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiTuk = {
  id: "01a0ea8a-f293-7578-a234-009426d9d96e",
  type: "page-type/lore",
  slug: "otherwhere-xi-tuk",
  title: "Tuk",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-tuk",
  facts: [
    {
      fact: "Tuk is a Hallurian slinger from the fishing shores of Lake Kital.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tuk fought for the Varak clan's invasion of Baran and was spared by Viv.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Viv spared Tuk together with Dala, a young camp cook.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Tuk's whereabouts are unknown.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
