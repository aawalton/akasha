import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const raidLeader = {
  id: "01a06586-0a1c-7b16-bf97-fcf745be8a4e",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "raid-leader",
  title: "Raid Leader",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
