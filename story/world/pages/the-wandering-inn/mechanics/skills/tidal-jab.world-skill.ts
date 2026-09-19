import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const tidalJab = {
  id: "01a0657d-0315-75ef-8c9c-5949cd77b0b6",
  type: "page-type/world-skill",
  slug: "tidal-jab",
  title: "Tidal Jab",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
