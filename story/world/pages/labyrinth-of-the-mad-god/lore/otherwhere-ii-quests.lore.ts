import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiQuests = {
  id: "01a0e9a4-b08b-7602-a924-bcc882231cc6",
  type: "page-type/lore",
  slug: "otherwhere-ii-quests",
  title: "Quests, Events and Challenges",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Quests are missions issued by the System, often in several stages.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Species-wide quests are given to an entire people at once.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Quests may carry hidden objectives that pay extra when discovered and met.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Bonus objectives raise the value of a quest's final reward.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The System rates performance on a quest as fair, strong, impressive, exceptional or phenomenal.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Quest reward packages climb from silver to gold to platinum and beyond.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A quest chest only appears once its recipient reads the quest update.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Emergency quests arrive with a countdown and a main and bonus objective.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The System can set kill quests on contestants, sending others to hunt them.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Events are tied to a place or a window of time and reward all who contribute.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Challenges are short trials; elite ones vanish once completed.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A challenge may be attempted only once by each person or party.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Rewards are always matched to the difficulty of what was overcome.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
