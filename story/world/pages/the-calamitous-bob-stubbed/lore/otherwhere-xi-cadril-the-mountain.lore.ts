import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiCadrilTheMountain = {
  id: "01a0ea7c-e4a7-758b-be5a-1a3f581675c4",
  type: "page-type/lore",
  slug: "otherwhere-xi-cadril-the-mountain",
  title: "Cadril the Mountain",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-cadril-the-mountain",
  facts: [
    {
      fact: "Cadril the Mountain was a storied Enorian warrior of the Blue Duke's line.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The deposed Blue Duke claims descent from Cadril the Mountain; Cadril is long dead.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
