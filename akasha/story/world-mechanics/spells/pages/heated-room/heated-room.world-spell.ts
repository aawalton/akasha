import type { WorldSpell } from "../../world-spell.page-type.ts"

export const heatedRoom = {
  id: "01a06572-95c8-7ea6-b89e-ab70140aaf8b",
  pageTypeSlug: "world-spell",
  slug: "heated-room",
  title: "Heated Room",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
