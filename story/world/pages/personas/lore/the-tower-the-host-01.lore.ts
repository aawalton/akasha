import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerTheHost01 = {
  id: "01a0d450-6b1e-78d5-9a73-adacfa0ec766",
  type: "page-type/lore",
  slug: "the-tower-the-host-01",
  title: "The Host",
  world: "world/personas",
  about: "character-other/the-tower-the-host-01",
  loreDisclosure: "lore-disclosure/game-master",
  facts: [
    "The Host, the loom that wove the False Haven, is dead.",
    "The Host's shed mantle of woven light is slack and grey, with no warmth left to weave.",
  ],
} as const satisfies Lore
