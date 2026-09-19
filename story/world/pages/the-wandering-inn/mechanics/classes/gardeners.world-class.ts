import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const gardeners = {
  id: "01a0657e-1366-785e-8f8b-8ee727cbaa82",
  type: "page-type/world-class",
  slug: "gardeners",
  title: "Gardeners",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
