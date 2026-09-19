import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const illumination = {
  id: "01a06572-95cb-731e-a24a-a6b27740e61e",
  type: "page-type/world-spell",
  slug: "illumination",
  title: "Illumination",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
