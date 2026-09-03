import type { WorldSpell } from "../../world-spell.page-type.ts"

export const blueBolt = {
  id: "01a06572-95b6-7a6c-ac7e-4b52c58241d4",
  pageTypeSlug: "world-spell",
  slug: "blue-bolt",
  title: "Blue Bolt",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
