import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const goodPerson = {
  id: "01a0657e-01e3-717d-a80e-ad47beea6986",
  type: "page-type/world-class",
  slug: "good-person",
  title: "Good Person",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:19:11.971Z",
  updatedAt: "2026-09-22T13:29:12.000Z",
} as const satisfies WorldClass
