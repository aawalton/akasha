import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const marcus = {
  id: "01a0ddfb-8e7b-7cf7-823d-dfffc1bcbcca",
  type: "page-type/lore",
  slug: "marcus",
  title: "Marcus",
  world: "world/tower-of-nimue",
  about: "character-other/tower-of-nimue-marcus",
  secrets: "jsonl",
} as const satisfies Lore
