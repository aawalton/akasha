import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const sandMercenaries = {
  id: "01a0657e-024a-7ac8-9b11-f29e968ab2fc",
  type: "world-class",
  slug: "sand-mercenaries",
  title: "Sand Mercenaries",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
