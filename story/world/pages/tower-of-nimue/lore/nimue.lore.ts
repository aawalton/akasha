import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const nimue = {
  id: "01a0ddfb-8e7b-75c7-a23a-8f59b1760d98",
  type: "page-type/lore",
  slug: "nimue",
  title: "Nimue",
  world: "world/tower-of-nimue",
  about: "character-other/tower-of-nimue-nimue",
  secrets: "jsonl",
} as const satisfies Lore
