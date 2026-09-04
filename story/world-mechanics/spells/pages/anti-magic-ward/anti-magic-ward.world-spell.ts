import type { WorldSpell } from "../../world-spell.page-type.ts"

export const antiMagicWard = {
  id: "01a06572-95b4-7480-a5b3-dd3da62f8a8e",
  pageTypeSlug: "world-spell",
  slug: "anti-magic-ward",
  title: "Anti-Magic Ward",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
