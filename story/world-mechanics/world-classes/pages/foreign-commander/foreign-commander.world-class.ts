import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const foreignCommander = {
  id: "01a0657e-1366-7eb7-98f2-d71a3c6f531f",
  type: "world-class",
  slug: "foreign-commander",
  title: "Foreign Commander",
  world: "the-wandering-inn",
  evolvesToSlugs: ["combined-arms-commander"],
  references: "jsonl",
} as const satisfies WorldClass
