import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiMother = {
  id: "01a0ea7f-3b3d-7f7e-90f0-2a322dc0c25d",
  type: "page-type/lore",
  slug: "otherwhere-xi-mother",
  title: "Mother",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-mother",
  facts: [
    {
      fact: "Captain Mother leads the Bitter Hearts, a crossbow order of wayward souls in Harrak's service.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mother is ancient and portly, and wears a coat of many pockets.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Bitter Hearts' motto is: First in... Last out.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mother's Bitter Hearts smuggled food to starving Baranese villages in the last war.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Mother is with the alliance army after the victory.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
