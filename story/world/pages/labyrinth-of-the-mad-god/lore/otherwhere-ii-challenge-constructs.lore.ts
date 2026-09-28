import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiChallengeConstructs = {
  id: "01a0e9c4-861d-725b-ba6a-8cfefbdcb85b",
  type: "page-type/lore",
  slug: "otherwhere-ii-challenge-constructs",
  title: "Challenge Constructs",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Challenge constructs are pure-mana copies of real warriors, with no energetic core.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A yellow-skinned horned demon waits motionless in a black ring for a duel.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The demon's black chitin plates repel all mana, even pure mana.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A robed mage construct with a skull staff offers a wizard duel in a gold ring.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Defeated constructs shatter into fragments of light, and a reward box appears.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
