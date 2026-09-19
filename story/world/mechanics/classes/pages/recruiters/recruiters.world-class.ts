import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const recruiters = {
  id: "01a0657e-0245-72b8-995b-f60c98c9eb57",
  type: "page-type/world-class",
  slug: "recruiters",
  title: "Recruiters",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
