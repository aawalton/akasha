import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const rogue = {
  id: "01a0657e-0248-7850-a0cc-d6eeafd33d75",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "rogue",
  title: "Rogue",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
