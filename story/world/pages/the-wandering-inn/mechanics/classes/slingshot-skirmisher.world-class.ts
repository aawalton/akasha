import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const slingshotSkirmisher = {
  id: "01a06586-0a43-72dc-827f-78babce6c388",
  type: "page-type/world-class",
  slug: "slingshot-skirmisher",
  title: "Slingshot Skirmisher",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
} as const satisfies WorldClass
