import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereQuestBosses = {
  id: "01a0e9c4-861d-7548-9eea-e6a3730786ad",
  type: "page-type/lore",
  slug: "otherwhere-quest-bosses",
  title: "Town, City and Capital Bosses",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Quest bosses are flawless System replicas of beasts from other worlds.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "They are not living inhabitants, so killing them has no consequence.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A siren or chime sounds inside a boss's territory, louder near its spawn point.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Bosses attack anything in their territory but never chase beyond it or raid settlements.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Bosses attack each other on sight where their territories overlap.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A slain boss shatters into motes of golden light, and its minions vanish with it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The granger city boss is a barn-sized green bird with a snake's head, venom and wind magic.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
