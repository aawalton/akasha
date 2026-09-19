import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const companyCaptain = {
  id: "01a0657e-134c-776b-a397-579aec1994f6",
  type: "page-type/world-class",
  slug: "company-captain",
  title: "Company Captain",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
