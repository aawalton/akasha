import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerTheHost01 = {
  id: "01a0d450-6b1e-78d5-9a73-adacfa0ec766",
  type: "page-type/lore",
  slug: "the-tower-the-host-01",
  title: "The Host",
  world: "world/personas",
  about: "character-other/the-tower-the-host-01",
  facts: [
    {
      fact: "The Host, the loom that wove the False Haven, is dead.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Host's shed mantle of woven light is slack and grey, with no warmth left to weave.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
