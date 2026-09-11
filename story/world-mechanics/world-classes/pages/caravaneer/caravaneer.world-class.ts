import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const caravaneer = {
  id: "01a0657e-01c2-7bf6-86c8-e8bfcf78acac",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "caravaneer",
  title: "Caravaneer",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
