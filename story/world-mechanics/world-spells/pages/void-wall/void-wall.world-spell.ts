import type { WorldSpell } from "../../world-spell.page-type.ts"

export const voidWall = {
  id: "01a06572-95e8-7e18-a41b-39b411e8e365",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "void-wall",
  title: "Void Wall",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
