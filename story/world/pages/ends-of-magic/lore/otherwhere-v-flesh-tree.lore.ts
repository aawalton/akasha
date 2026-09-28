import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVFleshTree = {
  id: "01a0e9ff-cb80-70da-ba23-c9c2e27c51aa",
  type: "page-type/lore",
  slug: "otherwhere-v-flesh-tree",
  title: "Flesh Tree",
  world: "world/ends-of-magic",
  about: "world-item/otherwhere-v-flesh-tree",
  facts: [
    {
      fact: "Nothing living grows in an undead blight; any plant there would feed on dark magic.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Blighted soil grows no plants; soil cleansed of the blight turns a healthy brown.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Flesh trees are trees of bone and vein that grow in the heart of a great blight.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Flesh trees bear undead fliers as fruit, which break off and perch on the branches.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Whole forests of flesh trees ring the ruined city at the heart of the Blight.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
