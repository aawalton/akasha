import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVBazanDhoHumal = {
  id: "01a0e9f8-0f1b-7f21-a670-2fafc16d0e68",
  type: "page-type/lore",
  slug: "otherwhere-v-bazan-dho-humal",
  title: "Bazan dho Humal",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-bazan-dho-humal",
  facts: [
    {
      fact: "Bazan dho Humal is a Giantsrest war mage, eager to please those above him.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Bazan serves Giantsrest's mage order.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
