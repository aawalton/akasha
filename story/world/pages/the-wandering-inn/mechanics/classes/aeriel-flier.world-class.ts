import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const aerielFlier = {
  id: "01a0657e-1326-768b-8b65-6bca0a4d6fbf",
  type: "page-type/world-class",
  slug: "aeriel-flier",
  title: "Aeriel Flier",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
