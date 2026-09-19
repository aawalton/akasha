import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const barrierOfWinds = {
  id: "01a06572-95b5-7761-b403-decff8f837a0",
  type: "page-type/world-spell",
  slug: "barrier-of-winds",
  title: "Barrier of Winds",
  world: "world/the-wandering-inn",
} as const satisfies WorldSpell
