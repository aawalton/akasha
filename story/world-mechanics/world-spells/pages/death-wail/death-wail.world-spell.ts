import type { WorldSpell } from "../../world-spell.page-type.ts"

export const deathWail = {
  id: "01a06572-95bb-7a6c-8671-9f12c138b89c",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "death-wail",
  title: "Death Wail",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
