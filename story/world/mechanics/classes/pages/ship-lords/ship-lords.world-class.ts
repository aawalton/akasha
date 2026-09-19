import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const shipLords = {
  id: "01a06586-0a3b-7c7c-b5e4-ad2d91569135",
  type: "page-type/world-class",
  slug: "ship-lords",
  title: "Ship Lords",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
