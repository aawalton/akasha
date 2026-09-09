import type { WorldSpell } from "../../world-spell.page-type.ts"

export const lightwall = {
  id: "01a06572-95d0-78e0-9c15-a06e6d2cccc0",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "lightwall",
  title: "Lightwall",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
