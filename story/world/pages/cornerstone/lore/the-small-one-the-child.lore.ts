import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theSmallOneTheChild = {
  id: "01a0ddff-b8bd-7e6d-8e53-e92caabc5908",
  type: "page-type/lore",
  slug: "the-small-one-the-child",
  title: "The Small One (the child)",
  world: "world/cornerstone",
  about: "world-character/cornerstone-the-small-one-the-child",
  facts: [
    {
      fact: "The Small One is a child of the founding camp.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Small One's tread is light as Quick-Step's, but without the fear in it, and warmer.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Small One's foot is small and near-bare.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Small One's foot lands soft and trusting, and does not brace against the core's cold.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Small One mostly runs, crossing the ground in bursts; children run.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Small One drops all at once to sit, folding down onto the ground without ceremony.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sitting, the Small One sometimes lays its hand flat against the soil, fingers spread.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
