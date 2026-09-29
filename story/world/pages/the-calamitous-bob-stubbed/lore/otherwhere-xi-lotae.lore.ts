import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiLotae = {
  id: "01a0ea8e-52d4-779a-b6c0-07342e441f9b",
  type: "page-type/lore",
  slug: "otherwhere-xi-lotae",
  title: "Lotae",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-lotae",
  facts: [
    {
      fact: "Lotae was a priestess of Maranor with the Enorian royalist army, cold and hostile.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lotae's soul pressed on others as a red wave of compliance.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Viv killed Lotae at the fall of Green Edge; Lotae is dead.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
