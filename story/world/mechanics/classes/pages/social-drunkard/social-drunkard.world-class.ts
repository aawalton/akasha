import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const socialDrunkard = {
  id: "01a0657e-025a-7e32-ba6d-7a4a84adadd9",
  type: "page-type/world-class",
  slug: "social-drunkard",
  title: "Social Drunkard",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
