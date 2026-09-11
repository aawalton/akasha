import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const expeditedTeleport = {
  id: "01a06572-95bf-7c5f-91fd-9e99598496a6",
  type: "world-spell",
  slug: "expedited-teleport",
  title: "Expedited Teleport",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
