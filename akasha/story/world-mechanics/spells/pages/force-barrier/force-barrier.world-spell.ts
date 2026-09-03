import type { WorldSpell } from "../../world-spell.page-type.ts"

export const forceBarrier = {
  id: "01a06572-95c4-7bbd-8dea-4eac44b5f80f",
  pageTypeSlug: "world-spell",
  slug: "force-barrier",
  title: "Force Barrier",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
