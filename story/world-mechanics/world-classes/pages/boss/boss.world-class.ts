import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const boss = {
  id: "01a0657e-133f-73eb-bcf3-dce657b092d3",
  type: "world-class",
  slug: "boss",
  title: "Boss",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
