import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiMarTheYounger = {
  id: "01a0ea80-4334-740b-826e-d264876b7f31",
  type: "page-type/lore",
  slug: "otherwhere-xi-mar-the-younger",
  title: "Mar the Younger",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-mar-the-younger",
  facts: [
    {
      fact: "Mar the Younger is a scout of Ravinport in Vizim, sworn to Harrak.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mar the Younger was once miscalled Gar.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mar the Younger courts Sin, Viv's sworn guard.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Mar the Younger serves Harrak after the last war.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
