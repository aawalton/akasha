import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const trapper = {
  id: "01a06586-0a6b-759b-822f-a44dec930e3d",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "trapper",
  title: "Trapper",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
