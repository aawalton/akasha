import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const rayOfAcid = {
  id: "01a06572-95dc-7a68-9b25-61cc853d3cb1",
  type: "page-type/world-spell",
  slug: "ray-of-acid",
  title: "Ray of Acid",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.420Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell
