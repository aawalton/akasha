import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const changeViscosityOil = {
  id: "01a06575-97fa-7bf4-8666-a6e7fce31869",
  type: "page-type/world-skill",
  slug: "change-viscosity-oil",
  title: "Change Viscosity (Oil)",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.570Z",
  updatedAt: "2026-09-22T13:31:48.000Z",
} as const satisfies WorldSkill
