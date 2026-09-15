import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const fistFighters = {
  id: "01a0657e-01dc-7f3b-99a8-c6b30afa555f",
  type: "world-class",
  slug: "fist-fighters",
  title: "Fist Fighters",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
