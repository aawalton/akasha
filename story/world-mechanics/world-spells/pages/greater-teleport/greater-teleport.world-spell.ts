import type { WorldSpell } from "../../world-spell.page-type.ts"

export const greaterTeleport = {
  id: "01a06572-95c7-7147-9436-151f7ce62450",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "greater-teleport",
  title: "Greater Teleport",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
