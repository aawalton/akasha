import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const shieldman = {
  id: "01a0657e-0254-7a96-9690-bec7b9e89936",
  type: "page-type/world-class",
  slug: "shieldman",
  title: "Shieldman",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
