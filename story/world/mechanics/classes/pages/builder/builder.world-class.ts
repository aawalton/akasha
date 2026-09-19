import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const builder = {
  id: "01a0657e-01c1-7144-aca4-4faf2e49d49c",
  type: "page-type/world-class",
  slug: "builder",
  title: "Builder",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
