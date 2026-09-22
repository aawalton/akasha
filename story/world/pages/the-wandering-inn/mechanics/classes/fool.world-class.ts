import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const fool = {
  id: "01a0657e-1365-7309-814d-bdded0143eb8",
  type: "page-type/world-class",
  slug: "fool",
  title: "Fool",
  world: "world/the-wandering-inn",
  appearanceCount: 10,
  references: "jsonl",
} as const satisfies WorldClass
