import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const menAtArms = {
  id: "01a0657e-139f-7af0-ae40-7473c231da85",
  type: "page-type/world-class",
  slug: "men-at-arms",
  title: "Men-At-Arms",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
