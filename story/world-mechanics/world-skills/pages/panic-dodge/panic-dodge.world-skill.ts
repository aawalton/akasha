import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const panicDodge = {
  id: "01a0657d-0286-7f54-94bd-85359489f110",
  type: "world-skill",
  slug: "panic-dodge",
  title: "Panic Dodge",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
