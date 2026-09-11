import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const powerStrike = {
  id: "01a0657d-0295-7176-805f-39e4d92c2432",
  type: "world-skill",
  slug: "power-strike",
  title: "Power Strike",
  world: "the-wandering-inn",
  evolvesToSlugs: ["minotaur-punch", "mirage-cut"],
  references: "jsonl",
} as const satisfies WorldSkill
