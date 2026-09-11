import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const lumberjack = {
  id: "01a0657e-1391-7b5e-a40d-685f99f485aa",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "lumberjack",
  title: "Lumberjack",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
