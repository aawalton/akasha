import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const absorbBlow = {
  id: "01a06575-97e8-7e00-8b21-5aa8aaf8bcee",
  type: "page-type/world-skill",
  slug: "absorb-blow",
  title: "Absorb Blow",
  world: "world/the-wandering-inn",
} as const satisfies WorldSkill
