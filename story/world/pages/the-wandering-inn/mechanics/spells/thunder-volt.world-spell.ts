import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const thunderVolt = {
  id: "01a06572-95e7-7ae8-ae55-800c915ae52a",
  type: "page-type/world-spell",
  slug: "thunder-volt",
  title: "Thunder Volt",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.431Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
