import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const infectionHealer = {
  id: "01a0657e-01fb-7e75-b87b-1f0dbeaf660c",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "infection-healer",
  title: "Infection Healer",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
