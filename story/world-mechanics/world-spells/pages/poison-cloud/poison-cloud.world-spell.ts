import type { WorldSpell } from "../../world-spell.page-type.ts"

export const poisonCloud = {
  id: "01a06572-95db-7c3e-86c8-ca486864bca0",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "poison-cloud",
  title: "Poison Cloud",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
