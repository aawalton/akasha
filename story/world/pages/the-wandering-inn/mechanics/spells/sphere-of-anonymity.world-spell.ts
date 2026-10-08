import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const sphereOfAnonymity = {
  id: "01a06572-95e2-72c7-ae67-b5726a58b74a",
  type: "page-type/world-spell",
  slug: "sphere-of-anonymity",
  title: "Sphere of Anonymity",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.426Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
