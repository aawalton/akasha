import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const rayOfFrost = {
  id: "01a06572-95dc-76c4-8815-78c2675ab2cd",
  type: "page-type/world-spell",
  slug: "ray-of-frost",
  title: "Ray of Frost",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.420Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell
