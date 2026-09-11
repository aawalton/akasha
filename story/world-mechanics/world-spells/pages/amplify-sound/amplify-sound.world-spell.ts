import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const amplifySound = {
  id: "01a06572-95b4-7356-bd4a-505de67bd7fe",
  type: "world-spell",
  slug: "amplify-sound",
  title: "Amplify Sound",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
