import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const flayTheLiving = {
  id: "01a06572-95c4-7149-9d83-c2fd8163d6fa",
  type: "page-type/world-spell",
  slug: "flay-the-living",
  title: "Flay the Living",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.396Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
