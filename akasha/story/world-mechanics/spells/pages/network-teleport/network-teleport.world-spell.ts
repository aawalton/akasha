import type { WorldSpell } from "../../world-spell.page-type.ts"

export const networkTeleport = {
  id: "01a06572-95d9-7f91-ae97-a6881d03b3a8",
  pageTypeSlug: "world-spell",
  slug: "network-teleport",
  title: "Network Teleport",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
