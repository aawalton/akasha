import type { WorldSpell } from "../../world-spell.page-type.ts"

export const pinpointSpell = {
  id: "01a06572-95db-7a81-b7ae-5352f22e57f9",
  pageTypeSlug: "world-spell",
  slug: "pinpoint-spell",
  title: "Pinpoint Spell",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
