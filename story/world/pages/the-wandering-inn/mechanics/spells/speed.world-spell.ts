import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const speed = {
  id: "01a06572-95e2-788a-b356-4d9b7812f586",
  type: "page-type/world-spell",
  slug: "speed",
  title: "Speed",
  world: "world/the-wandering-inn",
  appearanceCount: 25,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.426Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
