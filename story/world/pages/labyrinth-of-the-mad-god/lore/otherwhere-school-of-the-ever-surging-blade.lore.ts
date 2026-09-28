import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereSchoolOfTheEverSurgingBlade = {
  id: "01a0e9c5-5f89-7b37-b55e-225c9b093dc1",
  type: "page-type/lore",
  slug: "otherwhere-school-of-the-ever-surging-blade",
  title: "The School of the Ever-Surging Blade",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "The School of the Ever-Surging Blade is a sword school and a System faction.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It teaches ten katas, and students must master three before learning more.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The first kata means endless advance: always moving forward, never giving way.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Members' sword skill is uncapped by class, though trials of mastery still apply.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An apprentice's master shapes the classes the apprentice is offered.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
