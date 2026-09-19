import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const regionalAdministrator = {
  id: "01a06586-0a20-7d07-affd-31cf9eba1a77",
  type: "page-type/world-class",
  slug: "regional-administrator",
  title: "Regional Administrator",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
