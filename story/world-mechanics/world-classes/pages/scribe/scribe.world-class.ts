import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const scribe = {
  id: "01a06586-0a2d-7827-a3ae-658af580bbb0",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "scribe",
  title: "Scribe",
  world: "the-wandering-inn",
  aliases: ["scribes"],
  references: "jsonl",
} as const satisfies WorldClass
