import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const backgroundChef = {
  id: "01a0657e-1336-7728-b902-427ede2a92a5",
  type: "page-type/world-class",
  slug: "background-chef",
  title: "Background Chef",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
