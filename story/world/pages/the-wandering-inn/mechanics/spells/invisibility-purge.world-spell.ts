import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const invisibilityPurge = {
  id: "01a06572-95cb-759c-86ad-20acde1d3db4",
  type: "page-type/world-spell",
  slug: "invisibility-purge",
  title: "Invisibility Purge",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.403Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
