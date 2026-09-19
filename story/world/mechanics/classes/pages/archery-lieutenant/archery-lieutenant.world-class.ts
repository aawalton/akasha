import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const archeryLieutenant = {
  id: "01a0657e-01aa-706b-8b9d-70bfb9608b91",
  type: "page-type/world-class",
  slug: "archery-lieutenant",
  title: "Archery Lieutenant",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
