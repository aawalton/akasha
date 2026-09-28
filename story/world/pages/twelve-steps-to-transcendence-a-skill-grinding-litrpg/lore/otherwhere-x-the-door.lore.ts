import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXTheDoor = {
  id: "01a0ea74-83f0-7585-bfd3-82466f669a39",
  type: "page-type/lore",
  slug: "otherwhere-x-the-door",
  title: "The Door",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-mechanic/otherwhere-x-the-door",
  facts: [
    {
      fact: "At advancement's qualitative change, an ascender's mind is drawn inward before a door.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Door is literal; what lies behind it differs per person but is pure madness.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "One must never open the Door.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "At Tier 0 the Door's temptation should be easy to ignore.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Door's temptation turns truly dangerous after Tier 3; many ascenders stall there.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Mages on the Path of Ascension chase "the truth of the Door".',
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
