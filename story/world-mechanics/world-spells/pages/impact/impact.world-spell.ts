import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const impact = {
  id: "01a06572-95cb-7b22-872a-477055bc7e31",
  type: "world-spell",
  slug: "impact",
  title: "Impact",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
