import type { WorldSpell } from "../../world-spell.page-type.ts"

export const slipperyFloor = {
  id: "01a06572-95e1-7ea4-af52-6d5d11bd0b79",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "slippery-floor",
  title: "Slippery Floor",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
