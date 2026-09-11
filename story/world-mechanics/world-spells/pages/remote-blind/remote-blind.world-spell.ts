import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const remoteBlind = {
  id: "01a06572-95dc-7df2-8448-0d794a2f01b9",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "remote-blind",
  title: "Remote Blind",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
