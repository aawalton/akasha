import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerAshling01 = {
  id: "01a0d44d-c48c-7fd1-9fbb-a43db4dad7ce",
  type: "page-type/lore",
  slug: "the-tower-ashling-01",
  title: "The Ashling",
  world: "world/personas",
  about: "character-other/the-tower-ashling-01",
  loreDisclosure: "lore-disclosure/game-master",
  facts: ["The Ashling is dead, its core cracked; only its grey ash heap remains."],
} as const satisfies Lore
