import type { WorldSpell } from "../../world-spell.page-type.ts"

export const quake = {
  id: "01a06572-95db-7299-a7c4-f4e35b52a094",
  pageTypeSlug: "world-spell",
  slug: "quake",
  title: "Quake",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
