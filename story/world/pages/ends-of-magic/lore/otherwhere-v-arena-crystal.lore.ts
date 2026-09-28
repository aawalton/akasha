import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVArenaCrystal = {
  id: "01a0ea04-ac68-70d4-b9e0-d225c64287f1",
  type: "page-type/lore",
  slug: "otherwhere-v-arena-crystal",
  title: "Arena Crystal",
  world: "world/ends-of-magic",
  about: "world-item/otherwhere-v-arena-crystal",
  facts: [
    {
      fact: "The arena crystal forms the shell of the Arena of the Concord.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Arena's crystal is beyond wizardry; an indestructible magical force enforces its rules.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In the aether, the arena crystal blocks the passage of all magic and wizardry.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The arena barrier can contain the greatest city-breaking spells.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Magical senses cannot pierce the arena crystal sphere.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gravity magic in the arena's seating rings turns each viewer comfortably toward the stage.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The arena permits only the most extreme social skills to count as violence.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
