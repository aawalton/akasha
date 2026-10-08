import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const cloudOfDarkness = {
  id: "01a06572-95b9-7bba-a12a-06a45dd6c261",
  type: "page-type/world-spell",
  slug: "cloud-of-darkness",
  title: "Cloud of Darkness",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.385Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
