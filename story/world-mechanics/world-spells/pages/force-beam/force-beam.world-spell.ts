import type { WorldSpell } from "../../world-spell.page-type.ts"

export const forceBeam = {
  id: "01a06572-95c4-7352-8acc-732e445c30f5",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "force-beam",
  title: "Force Beam",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
