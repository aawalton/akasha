import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const greeters = {
  id: "01a0657e-136e-7338-ba98-91baeba565d2",
  type: "page-type/world-class",
  slug: "greeters",
  title: "Greeters",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.462Z",
  updatedAt: "2026-09-22T13:29:12.000Z",
} as const satisfies WorldClass
