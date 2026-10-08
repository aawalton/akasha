import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const rapidTeleport = {
  id: "01a06572-95dc-790b-9cb3-82683872a2ca",
  type: "page-type/world-spell",
  slug: "rapid-teleport",
  title: "Rapid Teleport",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.420Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell
