import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const doubledEcho = {
  id: "01a06572-95be-7328-9a66-ada1bfc61b76",
  type: "world-spell",
  slug: "doubled-echo",
  title: "Doubled Echo",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
