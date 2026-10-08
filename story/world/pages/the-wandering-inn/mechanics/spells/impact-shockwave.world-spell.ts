import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const impactShockwave = {
  id: "01a06572-95cb-78c9-9e33-55482ecb9d7e",
  type: "page-type/world-spell",
  slug: "impact-shockwave",
  title: "Impact Shockwave",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.403Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
