import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const interceptMissive = {
  id: "01a06575-9820-710f-bb57-cf902179f732",
  type: "world-skill",
  slug: "intercept-missive",
  title: "Intercept Missive",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
