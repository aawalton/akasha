import type { WorldSpell } from "../../world-spell.page-type.ts"

export const iceElemental = {
  id: "01a06572-95c9-7c05-a2ea-a3b67ca30dbf",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "ice-elemental",
  title: "Ice Elemental",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
