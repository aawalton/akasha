import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const secondSun = {
  id: "01a06572-95df-746a-833e-66f1d78c0d68",
  type: "page-type/world-spell",
  slug: "second-sun",
  title: "Second Sun",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.423Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
