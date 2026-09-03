import type { WorldSpell } from "../../world-spell.page-type.ts"

export const magicMirror = {
  id: "01a06572-95d1-7d87-a0d2-5b23a8425945",
  pageTypeSlug: "world-spell",
  slug: "magic-mirror",
  title: "Magic Mirror",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
