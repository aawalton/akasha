import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const autocastIceSpikes = {
  id: "01a06572-95b5-7d52-bfc5-884c21b26b7f",
  type: "page-type/world-spell",
  slug: "autocast-ice-spikes",
  title: "Autocast: Ice Spikes",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.381Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
