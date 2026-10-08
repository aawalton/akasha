import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const greaterTeleport = {
  id: "01a06572-95c7-7147-9436-151f7ce62450",
  type: "page-type/world-spell",
  slug: "greater-teleport",
  title: "Greater Teleport",
  world: "world/the-wandering-inn",
  appearanceCount: 26,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.399Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
