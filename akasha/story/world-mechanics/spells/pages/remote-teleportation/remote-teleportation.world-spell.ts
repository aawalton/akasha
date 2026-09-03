import type { WorldSpell } from "../../world-spell.page-type.ts"

export const remoteTeleportation = {
  id: "01a06572-95dc-75fd-b461-fc7733c6815c",
  pageTypeSlug: "world-spell",
  slug: "remote-teleportation",
  title: "Remote Teleportation",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
