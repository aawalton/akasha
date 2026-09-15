import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const barkeeper = {
  id: "01a0657e-133b-76e4-9ca8-cd8205526d60",
  type: "world-class",
  slug: "barkeeper",
  title: "Barkeeper",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
