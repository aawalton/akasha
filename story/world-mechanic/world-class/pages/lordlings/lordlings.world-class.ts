import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const lordlings = {
  id: "01a0657e-0221-79b8-a046-bc8bb10d973e",
  type: "world-class",
  slug: "lordlings",
  title: "Lordlings",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
