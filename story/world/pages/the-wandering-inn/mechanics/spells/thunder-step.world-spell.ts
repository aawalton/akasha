import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const thunderStep = {
  id: "01a06572-95e7-7b00-a6ac-4bbda7fade13",
  type: "page-type/world-spell",
  slug: "thunder-step",
  title: "Thunder Step",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.431Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
