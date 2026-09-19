import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const snitch = {
  id: "01a0657e-025a-78db-9468-6a2e387710a3",
  type: "page-type/world-class",
  slug: "snitch",
  title: "Snitch",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
