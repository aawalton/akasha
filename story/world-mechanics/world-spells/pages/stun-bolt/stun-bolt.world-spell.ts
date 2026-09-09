import type { WorldSpell } from "../../world-spell.page-type.ts"

export const stunBolt = {
  id: "01a06572-95e4-7fd3-b51f-479df0a21593",
  pageTypeSlug: "world-spell",
  slug: "stun-bolt",
  title: "Stun Bolt",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
