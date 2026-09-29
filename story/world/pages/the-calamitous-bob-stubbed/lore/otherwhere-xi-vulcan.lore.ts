import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiVulcan = {
  id: "01a0ea7e-3c7a-706c-a2c8-e459157609a1",
  type: "page-type/lore",
  slug: "otherwhere-xi-vulcan",
  title: "Vulcan",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-vulcan",
  facts: [
    {
      fact: "Vulcan is a silverite golem, a son of Solfis, and a smith.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Vulcan is a precision metalworker who astonishes human smiths and apprentices.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Vulcan helped tear the cursed archmage Semeryss apart in the ziggurat.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Vulcan is at work in New Harrak's forges.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
