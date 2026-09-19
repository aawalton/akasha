import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const illusionPurge = {
  id: "01a06572-95cb-7126-b07c-b0c834ce8cea",
  type: "page-type/world-spell",
  slug: "illusion-purge",
  title: "Illusion Purge",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
