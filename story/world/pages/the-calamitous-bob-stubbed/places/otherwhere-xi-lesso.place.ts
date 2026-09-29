import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXiLesso = {
  id: "01a0ea88-4595-7279-ab05-1fc01709aa3f",
  type: "page-type/place",
  slug: "otherwhere-xi-lesso",
  title: "Lesso",
  world: "world/the-calamitous-bob-stubbed",
  within: "place/otherwhere-xi-enoria",
  facts: [
    {
      fact: "Lesso is an Enorian town about a week north-east of the frontier villages on the Deadshield's edge.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lesso has an archpriest of Maranor.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An archpriest of Lesso died lifting a curse by taking the sin upon himself.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Bounty posters are pinned up in Lesso and the towns around it.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
