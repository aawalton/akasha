import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const pegasusFlier = {
  id: "01a0657e-13b7-78d1-9297-824e2c61f8af",
  type: "page-type/world-class",
  slug: "pegasus-flier",
  title: "Pegasus Flier",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
