import type { WorldSpell } from "../../world-spell.page-type.ts"

export const deepFreeze = {
  id: "01a06572-95bc-796f-98fd-986c7c40d600",
  pageTypeSlug: "world-spell",
  slug: "deep-freeze",
  title: "Deep Freeze",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
