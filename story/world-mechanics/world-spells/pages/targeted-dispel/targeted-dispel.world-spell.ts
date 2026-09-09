import type { WorldSpell } from "../../world-spell.page-type.ts"

export const targetedDispel = {
  id: "01a06572-95e5-7520-a44a-ee91ae54941a",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "targeted-dispel",
  title: "Targeted Dispel",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
