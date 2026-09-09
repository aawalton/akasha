import type { WorldSpell } from "../../world-spell.page-type.ts"

export const silenced = {
  id: "01a06572-95e1-7e2c-a69d-7e4da24f3d8c",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "silenced",
  title: "Silenced",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
