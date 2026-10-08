import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const noviceSpellcaster = {
  id: "01a0657e-0235-786a-87d8-f3d00da5688b",
  type: "page-type/world-class",
  slug: "novice-spellcaster",
  title: "Novice Spellcaster",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:19:12.053Z",
  updatedAt: "2026-09-22T13:29:43.000Z",
} as const satisfies WorldClass
