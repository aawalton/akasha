import type { WorldSkill } from "../../world-skill.page-type.ts"

export const powerStrike = {
  id: "01a0657d-0295-7176-805f-39e4d92c2432",
  pageTypeSlug: "world-skill",
  slug: "power-strike",
  title: "Power Strike",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["minotaur-punch", "mirage-cut"],
  references: "jsonl",
} as const satisfies WorldSkill
