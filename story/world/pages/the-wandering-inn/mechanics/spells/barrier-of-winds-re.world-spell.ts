import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const barrierOfWindsRe = {
  id: "01a06572-95b5-7c2f-9a01-99339458dbdf",
  type: "page-type/world-spell",
  slug: "barrier-of-winds-re",
  title: "Barrier of Winds Re",
  world: "world/the-wandering-inn",
} as const satisfies WorldSpell
