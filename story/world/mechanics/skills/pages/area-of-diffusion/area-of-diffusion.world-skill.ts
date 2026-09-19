import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const areaOfDiffusion = {
  id: "01a06575-97ec-7ff5-b1d4-7ee04964d126",
  type: "page-type/world-skill",
  slug: "area-of-diffusion",
  title: "Area of Diffusion",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
