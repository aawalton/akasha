import type { WorldSpell } from "../../world-spell.page-type.ts"

export const emergencyTeleport = {
  id: "01a06572-95bf-7584-93d0-dd3652d3df59",
  pageTypeSlug: "world-spell",
  slug: "emergency-teleport",
  title: "Emergency Teleport",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
