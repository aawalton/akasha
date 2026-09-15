import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const telepath = {
  id: "01a06586-0a64-7a70-bed3-7b560831288a",
  type: "world-class",
  slug: "telepath",
  title: "Telepath",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
