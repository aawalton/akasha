import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const lordOfTheDance = {
  id: "01a0657e-021b-7e83-bfd6-860846fe4483",
  type: "page-type/world-class",
  slug: "lord-of-the-dance",
  title: "Lord of the Dance",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
