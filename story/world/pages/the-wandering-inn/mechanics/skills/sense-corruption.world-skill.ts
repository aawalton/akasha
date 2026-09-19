import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const senseCorruption = {
  id: "01a0657d-02b9-7a80-a572-251ed0ca3235",
  type: "page-type/world-skill",
  slug: "sense-corruption",
  title: "Sense Corruption",
  world: "world/the-wandering-inn",
} as const satisfies WorldSkill
