import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const noviceMage = {
  id: "01a0657e-13b2-7da4-b3e4-db465cb2f784",
  type: "world-class",
  slug: "novice-mage",
  title: "Novice Mage",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
