import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const foreDrake = {
  id: "01a0657e-01de-79e6-88e2-4d075e8003e5",
  type: "page-type/world-class",
  slug: "fore-drake",
  title: "Fore Drake",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
