import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theSystem = {
  id: "01a0ddfb-8e7c-70b7-b47d-1f7ea81d5fb4",
  type: "page-type/lore",
  slug: "the-system",
  title: "The System",
  world: "world/tower-of-nimue",
  about: "world/tower-of-nimue",
  secrets: "jsonl",
} as const satisfies Lore
