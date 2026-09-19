import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const storytellers = {
  id: "01a06586-0a56-7f21-b3fc-b99eeff2cde0",
  type: "page-type/world-class",
  slug: "storytellers",
  title: "Storytellers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
