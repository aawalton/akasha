import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const swordDancer = {
  id: "01a06586-0a60-72f4-b81b-e0a6b04c39bf",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "sword-dancer",
  title: "Sword Dancer",
  world: "the-wandering-inn",
  aliases: ["sword-dancers"],
  references: "jsonl",
} as const satisfies WorldClass
