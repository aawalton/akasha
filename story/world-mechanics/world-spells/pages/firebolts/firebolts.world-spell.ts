import type { WorldSpell } from "../../world-spell.page-type.ts"

export const firebolts = {
  id: "01a06572-95c2-7776-a8e0-93059593fcfa",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "firebolts",
  title: "Firebolts",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
