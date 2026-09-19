import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const treasuryKeeper = {
  id: "01a06586-0a6c-78be-ad3f-177bb8620713",
  type: "page-type/world-class",
  slug: "treasury-keeper",
  title: "Treasury Keeper",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
