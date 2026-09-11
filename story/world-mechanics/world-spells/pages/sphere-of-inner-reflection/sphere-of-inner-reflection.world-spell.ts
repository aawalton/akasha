import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const sphereOfInnerReflection = {
  id: "01a06572-95e2-7e12-afa8-eb49e284ea6d",
  type: "world-spell",
  slug: "sphere-of-inner-reflection",
  title: "Sphere of Inner Reflection",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
