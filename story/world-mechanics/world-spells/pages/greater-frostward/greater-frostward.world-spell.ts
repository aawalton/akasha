import type { WorldSpell } from "../../world-spell.page-type.ts"

export const greaterFrostward = {
  id: "01a06572-95c7-721e-9243-a047142ed73c",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "greater-frostward",
  title: "Greater Frostward",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
