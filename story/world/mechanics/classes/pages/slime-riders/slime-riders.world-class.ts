import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const slimeRiders = {
  id: "01a06586-0a43-7dc0-bc33-3d6ecddf446e",
  type: "page-type/world-class",
  slug: "slime-riders",
  title: "Slime Riders",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
