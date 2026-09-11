import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const deployMassLandmines = {
  id: "01a06575-9803-7284-bd5e-58e83b170fe3",
  type: "world-skill",
  slug: "deploy-mass-landmines",
  title: "Deploy Mass Landmines",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
