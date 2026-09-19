import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const psychics = {
  id: "01a06586-0a19-7c85-bab5-873a796c8ad7",
  type: "page-type/world-class",
  slug: "psychics",
  title: "Psychics",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
