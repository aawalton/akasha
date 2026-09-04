import type { WorldSpell } from "../../world-spell.page-type.ts"

export const autospell = {
  id: "01a06572-95b5-70e8-a06e-fe7eeb712684",
  pageTypeSlug: "world-spell",
  slug: "autospell",
  title: "Autospell",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
