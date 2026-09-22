import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const peacekeepers = {
  id: "01a0657e-0237-7bb5-8257-726cba10eff6",
  type: "page-type/world-class",
  slug: "peacekeepers",
  title: "Peacekeepers",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
} as const satisfies WorldClass
