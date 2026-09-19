import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const weaver = {
  id: "01a06586-0a76-7a37-9bb0-a4d0dd70de1c",
  type: "page-type/world-class",
  slug: "weaver",
  title: "Weaver",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
