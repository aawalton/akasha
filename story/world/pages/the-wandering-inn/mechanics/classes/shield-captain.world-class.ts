import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const shieldCaptain = {
  id: "01a0657e-0254-77d5-b00f-50f3ac5aa36a",
  type: "page-type/world-class",
  slug: "shield-captain",
  title: "Shield Captain",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
