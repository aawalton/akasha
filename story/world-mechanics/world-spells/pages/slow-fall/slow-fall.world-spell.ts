import type { WorldSpell } from "../../world-spell.page-type.ts"

export const slowFall = {
  id: "01a06572-95e1-751a-b401-ec050c458dee",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "slow-fall",
  title: "Slow Fall",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
