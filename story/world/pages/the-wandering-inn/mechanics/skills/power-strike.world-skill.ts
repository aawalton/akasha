import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const powerStrike = {
  id: "01a0657d-0295-7176-805f-39e4d92c2432",
  type: "page-type/world-skill",
  slug: "power-strike",
  title: "Power Strike",
  world: "world/the-wandering-inn",
  appearanceCount: 29,
  evolvesToSlugs: ["world-skill/minotaur-punch", "world-skill/mirage-cut"],
  references: "jsonl",
} as const satisfies WorldSkill
