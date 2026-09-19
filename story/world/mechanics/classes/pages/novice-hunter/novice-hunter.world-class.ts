import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const noviceHunter = {
  id: "01a0657e-0235-72b6-af59-4c4e12df8b2c",
  type: "page-type/world-class",
  slug: "novice-hunter",
  title: "Novice Hunter",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
