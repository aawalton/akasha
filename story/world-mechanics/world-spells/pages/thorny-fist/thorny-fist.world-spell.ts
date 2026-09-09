import type { WorldSpell } from "../../world-spell.page-type.ts"

export const thornyFist = {
  id: "01a06572-95e6-7223-87a2-4e5ed51f8de4",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "thorny-fist",
  title: "Thorny Fist",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
