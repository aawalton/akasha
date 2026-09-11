import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const deathMagicProficiency = {
  id: "01a06575-9802-79bd-8049-4900e4b903e1",
  type: "world-skill",
  slug: "death-magic-proficiency",
  title: "Death Magic Proficiency",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
