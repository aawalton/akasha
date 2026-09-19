import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const sharpshooter = {
  id: "01a0657e-0254-71f7-a66d-10c0bd2ff01e",
  type: "page-type/world-class",
  slug: "sharpshooter",
  title: "Sharpshooter",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
