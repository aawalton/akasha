import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const prismaticBarrier = {
  id: "01a06572-95db-768a-bc2b-85f99e94bacb",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "prismatic-barrier",
  title: "Prismatic Barrier",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
