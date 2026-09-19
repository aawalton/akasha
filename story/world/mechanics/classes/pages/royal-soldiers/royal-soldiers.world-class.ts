import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const royalSoldiers = {
  id: "01a06586-0a26-72a3-8ee0-ea6f023a4676",
  type: "page-type/world-class",
  slug: "royal-soldiers",
  title: "Royal Soldiers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
