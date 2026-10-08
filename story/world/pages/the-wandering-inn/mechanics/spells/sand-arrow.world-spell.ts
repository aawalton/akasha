import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const sandArrow = {
  id: "01a06572-95de-7928-89f8-be49b72f387d",
  type: "page-type/world-spell",
  slug: "sand-arrow",
  title: "Sand Arrow",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.422Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
