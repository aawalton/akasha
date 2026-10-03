import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const mrAldous = {
  id: "01a0ddf8-63fd-73fc-b1e1-46e9dc9adacd",
  type: "page-type/lore",
  slug: "mr-aldous",
  title: "Mr. Aldous",
  world: "world/the-beholder",
  about: "character-other/the-beholder-mr-aldous",
  secrets: "jsonl",
} as const satisfies Lore
