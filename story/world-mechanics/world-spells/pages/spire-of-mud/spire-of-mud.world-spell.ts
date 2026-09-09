import type { WorldSpell } from "../../world-spell.page-type.ts"

export const spireOfMud = {
  id: "01a06572-95e2-74bb-90a4-665ab38ecc5d",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "spire-of-mud",
  title: "Spire of Mud",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
