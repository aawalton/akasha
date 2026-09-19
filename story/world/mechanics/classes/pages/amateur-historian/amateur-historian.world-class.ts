import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const amateurHistorian = {
  id: "01a0657e-132c-7b0b-b929-af698027d1db",
  type: "page-type/world-class",
  slug: "amateur-historian",
  title: "Amateur Historian",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
