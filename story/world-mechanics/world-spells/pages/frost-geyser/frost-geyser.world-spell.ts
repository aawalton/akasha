import type { WorldSpell } from "../../world-spell.page-type.ts"

export const frostGeyser = {
  id: "01a06572-95c5-7988-acbc-d55716cad6e4",
  pageTypeSlug: "world-spell",
  slug: "frost-geyser",
  title: "Frost Geyser",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
