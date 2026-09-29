import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXTrances = {
  id: "01a0ea76-efc1-75d3-99ed-dec021c732fd",
  type: "page-type/lore",
  slug: "otherwhere-x-trances",
  title: "Trances",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-mechanic/otherwhere-x-trances",
  facts: [
    {
      fact: "A Trance is a blank, emotionless state of perfect combat rhythm beyond physical limits.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Trances are extremely rare, nearly myth among common fighters.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Interrupting a fighter in a Trance is a great taboo among fighters.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A Trance is seen as a golden chance and a sign of true talent.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Leaving a Trance returns all pain at once, and its effects vanish.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ben held off a peak Tier 1 troll in a Trance before collapsing; Arthur waited, then helped.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
