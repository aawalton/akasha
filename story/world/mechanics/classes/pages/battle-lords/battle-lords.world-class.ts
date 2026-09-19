import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const battleLords = {
  id: "01a0657e-01b6-7774-8d0d-e5cc0a07e0e7",
  type: "page-type/world-class",
  slug: "battle-lords",
  title: "Battle Lords",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
