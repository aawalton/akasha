import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const goodPerson = {
  id: "01a0657e-01e3-717d-a80e-ad47beea6986",
  type: "world-class",
  slug: "good-person",
  title: "Good Person",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
