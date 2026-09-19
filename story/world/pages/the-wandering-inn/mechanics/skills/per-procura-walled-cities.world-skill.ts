import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const perProcuraWalledCities = {
  id: "01a0657d-028e-7311-9176-03b69f231b52",
  type: "page-type/world-skill",
  slug: "per-procura-walled-cities",
  title: "Per Procura (Walled Cities)",
  world: "world/the-wandering-inn",
} as const satisfies WorldSkill
