import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiRadus = {
  id: "01a0ea7f-3b3d-7ee9-839f-a2beea46dccd",
  type: "page-type/lore",
  slug: "otherwhere-xi-radus",
  title: "Radus",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-radus",
  facts: [
    {
      fact: "Bishop Radus is New Harrak's Bishop of Neriad, with a hooked nose.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Radus led the ritual that redeemed the god Efestar at the great statue by Sinur's Gate.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Radus had a vision that Oleander still lived after the rout.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Radus serves on the Plain of the Gods below Sinur's Gate.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
