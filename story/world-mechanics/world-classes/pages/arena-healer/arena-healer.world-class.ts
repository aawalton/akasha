import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const arenaHealer = {
  id: "01a0657e-1330-748c-86bd-3d349263f8cf",
  type: "world-class",
  slug: "arena-healer",
  title: "Arena Healer",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
