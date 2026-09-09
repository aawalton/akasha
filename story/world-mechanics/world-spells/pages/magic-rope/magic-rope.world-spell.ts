import type { WorldSpell } from "../../world-spell.page-type.ts"

export const magicRope = {
  id: "01a06572-95d1-7d39-a021-1dbae3e3c29e",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "magic-rope",
  title: "Magic Rope",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
