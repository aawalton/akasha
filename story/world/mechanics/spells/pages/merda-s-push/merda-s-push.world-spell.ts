import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const merdaSPush = {
  id: "01a06572-95d2-7776-b782-cb2f14ce0add",
  type: "page-type/world-spell",
  slug: "merda-s-push",
  title: "Merda’s Push",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
