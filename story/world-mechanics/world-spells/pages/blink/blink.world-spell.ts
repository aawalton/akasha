import type { WorldSpell } from "../../world-spell.page-type.ts"

export const blink = {
  id: "01a06572-95b6-7d67-8b4e-2ec12732b722",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "blink",
  title: "Blink",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
