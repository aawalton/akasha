import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const forceShield = {
  id: "01a06572-95c4-7003-af85-ca8124ae8ceb",
  type: "page-type/world-spell",
  slug: "force-shield",
  title: "Force Shield",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.396Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
