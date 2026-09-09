import type { WorldSpell } from "../../world-spell.page-type.ts"

export const grandTeleportation = {
  id: "01a06572-95c6-7ecd-bf9c-84fd6f662708",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "grand-teleportation",
  title: "Grand Teleportation",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
