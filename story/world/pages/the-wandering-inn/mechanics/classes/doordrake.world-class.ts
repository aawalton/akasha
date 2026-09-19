import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const doordrake = {
  id: "01a0657e-1356-773f-88e7-06ae302ca51e",
  type: "page-type/world-class",
  slug: "doordrake",
  title: "Doordrake",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
