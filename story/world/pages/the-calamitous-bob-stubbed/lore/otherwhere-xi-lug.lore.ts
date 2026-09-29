import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiLug = {
  id: "01a0ea8f-a12c-77ee-a8d9-7319f14e1705",
  type: "page-type/lore",
  slug: "otherwhere-xi-lug",
  title: "Lug",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-lug",
  facts: [
    {
      fact: "Lug was a Hallurian slinger in Chief Emki's band of the Varak clan's host.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Viv killed Lug when the Varak clan was crushed; Lug is dead.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
