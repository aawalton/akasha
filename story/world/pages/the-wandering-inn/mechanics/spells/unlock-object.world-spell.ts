import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const unlockObject = {
  id: "01a06572-95e8-75a7-a4b5-36c54f611f2d",
  type: "page-type/world-spell",
  slug: "unlock-object",
  title: "Unlock Object",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.432Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
