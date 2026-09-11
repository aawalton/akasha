import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const clown = {
  id: "01a0657e-134b-7abc-8312-aaca91772437",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "clown",
  title: "Clown",
  world: "the-wandering-inn",
  aliases: ["clowns"],
  references: "jsonl",
} as const satisfies WorldClass
