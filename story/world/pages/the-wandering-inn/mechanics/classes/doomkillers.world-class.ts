import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const doomkillers = {
  id: "01a0657e-01d0-7f99-a012-e0aa7b49db20",
  type: "page-type/world-class",
  slug: "doomkillers",
  title: "Doomkillers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
