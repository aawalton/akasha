import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const crewOperator = {
  id: "01a0657e-01cc-7e6b-ac2e-9332dce97e46",
  type: "page-type/world-class",
  slug: "crew-operator",
  title: "Crew Operator",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
