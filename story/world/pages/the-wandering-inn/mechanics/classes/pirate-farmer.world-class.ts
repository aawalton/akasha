import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const pirateFarmer = {
  id: "01a06586-0a07-72f1-94c0-bad477c54473",
  type: "page-type/world-class",
  slug: "pirate-farmer",
  title: "Pirate Farmer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
