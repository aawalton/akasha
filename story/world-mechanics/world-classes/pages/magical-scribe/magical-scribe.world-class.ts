import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const magicalScribe = {
  id: "01a0657e-139b-7dd3-80b4-4edeaa73fae6",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "magical-scribe",
  title: "Magical Scribe",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
