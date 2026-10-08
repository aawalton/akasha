import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const grandTeleport = {
  id: "01a06572-95c6-7891-9972-36bcafa19ba6",
  type: "page-type/world-spell",
  slug: "grand-teleport",
  title: "Grand Teleport",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.398Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
