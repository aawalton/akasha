import type { WorldSpell } from "../../world-spell.page-type.ts"

export const dispel = {
  id: "01a06572-95be-7043-ad7c-94786ec8aef1",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "dispel",
  title: "Dispel",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
