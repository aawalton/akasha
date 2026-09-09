import type { WorldSpell } from "../../world-spell.page-type.ts"

export const rapidTeleportation = {
  id: "01a06572-95dc-7f6f-9f84-91bebcbb29be",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "rapid-teleportation",
  title: "Rapid Teleportation",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
