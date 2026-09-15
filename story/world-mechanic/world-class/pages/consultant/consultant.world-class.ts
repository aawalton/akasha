import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const consultant = {
  id: "01a0657e-134c-76b2-97d4-44cf592198ee",
  type: "world-class",
  slug: "consultant",
  title: "Consultant",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
