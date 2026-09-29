import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiMotherTheRedDragon = {
  id: "01a0ea7f-3b3d-7fd3-8768-c3840d4f1c0b",
  type: "page-type/lore",
  slug: "otherwhere-xi-mother-the-red-dragon",
  title: "Mother, the Red Dragon",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-mother-the-red-dragon",
  facts: [
    {
      fact: "Mother is a red dragoness the size of an airliner, oldest of the fire bloodline.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mother bears a single name, the highest rank among dragons.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mother's breath can melt silverite in one blast.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mother watches over her brood from far away.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mother came to Mornyr at the war's end, over the ruined city.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Avarice means to introduce Viv to Mother.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
