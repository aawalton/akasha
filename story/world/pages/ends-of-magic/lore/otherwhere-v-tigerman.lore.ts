import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVTigerman = {
  id: "01a0e9f3-7322-7b74-a55e-8f463df581ac",
  type: "page-type/lore",
  slug: "otherwhere-v-tigerman",
  title: "Tigerman",
  world: "world/ends-of-magic",
  about: "world-species/otherwhere-v-tigerman",
  facts: [
    {
      fact: "Tigermen are one of Davrar's animal-peoples, with the look of tigers.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tigermen live in Keihona, where some serve in the city guard and lead guard squads.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
