import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const tempestImpaler = {
  id: "01a0657d-0311-739b-b016-487da1b47360",
  type: "page-type/world-skill",
  slug: "tempest-impaler",
  title: "Tempest Impaler",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
