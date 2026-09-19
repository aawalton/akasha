import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const stoneguard = {
  id: "01a06586-0a54-7a2b-bfcd-0cc32e74342e",
  type: "page-type/world-class",
  slug: "stoneguard",
  title: "Stoneguard",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
