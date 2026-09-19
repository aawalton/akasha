import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const shieldguard = {
  id: "01a0657e-0254-7dbe-b8a8-cd94a4d708a0",
  type: "page-type/world-class",
  slug: "shieldguard",
  title: "Shieldguard",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
