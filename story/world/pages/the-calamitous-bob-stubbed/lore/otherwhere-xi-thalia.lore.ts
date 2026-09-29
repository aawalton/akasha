import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiThalia = {
  id: "01a0ea7e-3c79-7fe6-95cc-0a5b62f94a4c",
  type: "page-type/lore",
  slug: "otherwhere-xi-thalia",
  title: "Thalia",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-thalia",
  facts: [
    {
      fact: "Thalia the Sculptor is a silverite golem, a daughter of Solfis.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Thalia was among the six golems Solfis first made, at Frostway.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Thalia helped tear the cursed archmage Semeryss apart in the ziggurat.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Thalia is at work in New Harrak.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
