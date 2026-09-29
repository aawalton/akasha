import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiEmki = {
  id: "01a0ea80-8c28-7c1c-a293-4112c1df86cc",
  type: "page-type/lore",
  slug: "otherwhere-xi-emki",
  title: "Chief Emki",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-emki",
  facts: [
    {
      fact: "Emki was chief of a band of Hallurian slingers in the Varak clan's host.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Viv killed Emki when the White Orchard crushed the Varak clan; Emki is dead.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
