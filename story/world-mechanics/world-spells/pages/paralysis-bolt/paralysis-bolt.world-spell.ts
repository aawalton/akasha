import type { WorldSpell } from "../../world-spell.page-type.ts"

export const paralysisBolt = {
  id: "01a06572-95da-71d9-bb50-91dfccd58529",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "paralysis-bolt",
  title: "Paralysis Bolt",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
