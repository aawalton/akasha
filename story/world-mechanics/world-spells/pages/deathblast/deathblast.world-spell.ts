import type { WorldSpell } from "../../world-spell.page-type.ts"

export const deathblast = {
  id: "01a06572-95bc-76b7-a25c-6b9014be16a3",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "deathblast",
  title: "Deathblast",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
