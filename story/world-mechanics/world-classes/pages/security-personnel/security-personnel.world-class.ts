import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const securityPersonnel = {
  id: "01a06586-0a2e-7b5b-8978-875564f75901",
  type: "world-class",
  slug: "security-personnel",
  title: "Security Personnel",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
