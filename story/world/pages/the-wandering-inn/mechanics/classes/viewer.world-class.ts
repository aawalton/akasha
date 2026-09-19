import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const viewer = {
  id: "01a0657e-026f-744f-b8ec-5e3f5c2924fb",
  type: "page-type/world-class",
  slug: "viewer",
  title: "Viewer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
