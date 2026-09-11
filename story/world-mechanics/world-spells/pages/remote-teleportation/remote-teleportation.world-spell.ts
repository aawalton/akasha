import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const remoteTeleportation = {
  id: "01a06572-95dc-75fd-b461-fc7733c6815c",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "remote-teleportation",
  title: "Remote Teleportation",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
