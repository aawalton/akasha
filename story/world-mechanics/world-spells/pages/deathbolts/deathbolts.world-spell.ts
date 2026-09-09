import type { WorldSpell } from "../../world-spell.page-type.ts"

export const deathbolts = {
  id: "01a06572-95bc-7f24-9bf3-eaae607c632a",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "deathbolts",
  title: "Deathbolts",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
