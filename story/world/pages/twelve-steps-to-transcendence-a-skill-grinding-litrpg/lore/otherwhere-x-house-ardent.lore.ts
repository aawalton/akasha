import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXHouseArdent = {
  id: "01a0ea79-2989-7cd1-a185-b159e829f881",
  type: "page-type/lore",
  slug: "otherwhere-x-house-ardent",
  title: "House Ardent",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-organization/otherwhere-x-house-ardent",
  facts: [
    {
      fact: "House Ardent is a noble House with a scion on this year's noble expedition.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Theodore Ardent is dimpled, unblinking and ever-smiling, and lives for a good fight.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Theodore Ardent is far stronger than the other youths at the expedition camp.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lady Alice calls Theodore Ardent a dangerous maniac and warns others to avoid him.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Theodore Ardent moves so fast he seems to teleport.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Theodore Ardent dislikes having mental skills used on him and warns people off it.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
