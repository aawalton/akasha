import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const forcewalls = {
  id: "01a06572-95c5-73f2-9fac-dc7a78597f09",
  type: "page-type/world-spell",
  slug: "forcewalls",
  title: "Forcewalls",
  world: "world/the-wandering-inn",
  appearanceCount: 6,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.397Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
