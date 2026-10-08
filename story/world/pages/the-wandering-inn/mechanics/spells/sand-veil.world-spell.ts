import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const sandVeil = {
  id: "01a06572-95de-779b-9dd3-121af9ded18f",
  type: "page-type/world-spell",
  slug: "sand-veil",
  title: "Sand Veil",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.422Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
