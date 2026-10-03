import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const tamsin = {
  id: "01a0ddf8-63fd-7e25-94a7-4aa80fe8a349",
  type: "page-type/lore",
  slug: "tamsin",
  title: "Tamsin",
  world: "world/the-beholder",
  about: "character-other/the-beholder-tamsin",
  secrets: "jsonl",
} as const satisfies Lore
