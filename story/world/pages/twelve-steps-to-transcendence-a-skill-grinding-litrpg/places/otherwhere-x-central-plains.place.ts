import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXCentralPlains = {
  id: "01a0ea6f-b8c4-777a-a6b1-5744facefb9c",
  type: "page-type/place",
  slug: "otherwhere-x-central-plains",
  title: "The Central Plains",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  facts: [
    {
      fact: "The Central Plains is a region of several kingdoms, bounded by regional walls.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A regional wall parts the Central Plains from the Western Plains.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Central Plains keep their own military, and its soldiers share one cycling technique.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sulon is one of the Central Plains kingdoms.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Most folk of the Central Plains are Tier 0 farmers and villagers who never see their status.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Central Plains folk often know nothing of the Western Plains' expedition festival.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
