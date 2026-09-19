import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const artisan = {
  id: "01a0657e-01ac-7aa6-a820-f0016a326d39",
  type: "page-type/world-class",
  slug: "artisan",
  title: "Artisan",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
