import type { WorldSpell } from "../../world-spell.page-type.ts"

export const waterwalk = {
  id: "01a06572-95e9-716d-a0bd-af2d50289020",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "waterwalk",
  title: "Waterwalk",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
