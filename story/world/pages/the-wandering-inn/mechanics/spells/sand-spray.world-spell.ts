import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const sandSpray = {
  id: "01a06572-95de-7dd6-8280-e0648248c632",
  type: "page-type/world-spell",
  slug: "sand-spray",
  title: "Sand Spray",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.422Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
