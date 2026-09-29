import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiFeather = {
  id: "01a0ea83-df1c-72a2-a5e4-963d10d79052",
  type: "page-type/lore",
  slug: "otherwhere-xi-feather",
  title: "Feather",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-feather",
  facts: [
    {
      fact: "Feather is a crossbow fighter of the Bitter Hearts, Harrak's gray-clad order of wayward souls.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Feather held the Bitter Hearts' stand beside Lorn, Nag, Salt, Auntie and Mug in the Remnant war.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Feather serves with the Bitter Hearts in Harrak's army after the final war.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
