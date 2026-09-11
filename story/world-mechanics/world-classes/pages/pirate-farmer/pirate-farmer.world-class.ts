import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const pirateFarmer = {
  id: "01a06586-0a07-72f1-94c0-bad477c54473",
  type: "world-class",
  slug: "pirate-farmer",
  title: "Pirate Farmer",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
