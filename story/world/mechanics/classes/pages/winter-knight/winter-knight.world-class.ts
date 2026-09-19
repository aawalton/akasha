import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const winterKnight = {
  id: "01a06586-0a77-7913-9591-ed0cc6863ff5",
  type: "page-type/world-class",
  slug: "winter-knight",
  title: "Winter Knight",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
