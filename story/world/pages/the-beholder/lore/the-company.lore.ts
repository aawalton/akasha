import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theCompany = {
  id: "01a0ddf8-63fd-7677-aa87-33227c2be418",
  type: "page-type/lore",
  slug: "the-company",
  title: "The Company",
  world: "world/the-beholder",
  about: "world-organization/the-beholder-the-company",
  secrets: "jsonl",
} as const satisfies Lore
