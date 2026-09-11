import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const changeViscosityOil = {
  id: "01a06575-97fa-7bf4-8666-a6e7fce31869",
  type: "world-skill",
  slug: "change-viscosity-oil",
  title: "Change Viscosity (Oil)",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
