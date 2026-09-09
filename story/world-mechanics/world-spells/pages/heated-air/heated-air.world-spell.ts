import type { WorldSpell } from "../../world-spell.page-type.ts"

export const heatedAir = {
  id: "01a06572-95c8-7bee-8db5-ee740e374ab2",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "heated-air",
  title: "Heated Air",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
