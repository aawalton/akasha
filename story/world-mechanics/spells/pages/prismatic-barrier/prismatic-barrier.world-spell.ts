import type { WorldSpell } from "../../world-spell.page-type.ts"

export const prismaticBarrier = {
  id: "01a06572-95db-768a-bc2b-85f99e94bacb",
  pageTypeSlug: "world-spell",
  slug: "prismatic-barrier",
  title: "Prismatic Barrier",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
