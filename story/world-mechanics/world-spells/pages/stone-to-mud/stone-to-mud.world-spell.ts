import type { WorldSpell } from "../../world-spell.page-type.ts"

export const stoneToMud = {
  id: "01a06572-95e3-7af8-9537-36d3fce86936",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "stone-to-mud",
  title: "Stone to Mud",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
