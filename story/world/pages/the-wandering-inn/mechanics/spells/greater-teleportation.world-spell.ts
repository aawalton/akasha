import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const greaterTeleportation = {
  id: "01a06572-95c7-7b35-a4ae-10c277da2c53",
  type: "page-type/world-spell",
  slug: "greater-teleportation",
  title: "Greater Teleportation",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.399Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
