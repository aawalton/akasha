import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const treacherousGunslinger = {
  id: "01a06586-0a6c-7a4a-b84a-d22b2eed4ce4",
  type: "page-type/world-class",
  slug: "treacherous-gunslinger",
  title: "Treacherous Gunslinger",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
