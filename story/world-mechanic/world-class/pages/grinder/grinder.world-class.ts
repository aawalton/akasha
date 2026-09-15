import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const grinder = {
  id: "01a0657e-01e5-7ea0-8720-54db2a75a1cc",
  type: "world-class",
  slug: "grinder",
  title: "Grinder",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
