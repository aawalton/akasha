import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const wardsOfDefense = {
  id: "01a06572-95e9-73e6-9949-2cb01c23c34c",
  type: "page-type/world-spell",
  slug: "wards-of-defense",
  title: "Wards of Defense",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.433Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
