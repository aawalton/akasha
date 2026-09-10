import type { skillCost } from "./skill-cost.select-property.ts"

export type SkillCost = (typeof skillCost.values)[number]
