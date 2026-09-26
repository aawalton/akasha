import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theFirstHarvest = {
  id: "01a0ddf8-63fd-77fc-8380-32a69f2ca5e5",
  type: "page-type/lore",
  slug: "the-first-harvest",
  title: "The First Harvest",
  world: "world/the-beholder",
  about: "world-mechanic/the-beholder-the-first-harvest",
  secrets: "jsonl",
} as const satisfies Lore
