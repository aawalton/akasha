import type { WorldSpell } from "../../world-spell.page-type.ts"

export const stoneLance = {
  id: "01a06572-95e3-7c27-aef8-efd0de676b7a",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "stone-lance",
  title: "Stone Lance",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
