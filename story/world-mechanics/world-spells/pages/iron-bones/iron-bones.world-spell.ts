import type { WorldSpell } from "../../world-spell.page-type.ts"

export const ironBones = {
  id: "01a06572-95cc-7738-9c2a-4c76630b3198",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "iron-bones",
  title: "Iron Bones",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
