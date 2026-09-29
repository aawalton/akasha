import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiAuntie = {
  id: "01a0ea78-368b-7790-8045-e5df4629cf4e",
  type: "page-type/lore",
  slug: "otherwhere-xi-auntie",
  title: "Auntie",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-auntie",
  facts: [
    {
      fact: "Auntie is a crossbow fighter of the Bitter Hearts, Harrak's gray-clad order of wayward souls.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Auntie held the Bitter Hearts' stand beside Lorn, Nag, Feather, Salt and Mug in the Remnant war.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Auntie serves with the Bitter Hearts in Harrak's army after the final war.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
