import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const spellKnight = {
  id: "01a06586-0a50-7ff4-9115-9def34b8b1ed",
  type: "page-type/world-class",
  slug: "spell-knight",
  title: "Spell Knight",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.416Z",
  updatedAt: "2026-09-22T13:30:07.000Z",
} as const satisfies WorldClass
