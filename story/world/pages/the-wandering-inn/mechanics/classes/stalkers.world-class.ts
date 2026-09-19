import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const stalkers = {
  id: "01a06586-0a52-70ba-a59b-4cf08de03adb",
  type: "page-type/world-class",
  slug: "stalkers",
  title: "Stalkers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
