import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const reaper = {
  id: "01a0657e-0243-77e0-b380-6b0a1142129b",
  type: "page-type/world-class",
  slug: "reaper",
  title: "Reaper",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
} as const satisfies WorldClass
