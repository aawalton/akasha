import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const thunderstrikeImpact = {
  id: "01a0657d-0315-7ae7-9963-7983c6873fb5",
  type: "page-type/world-skill",
  slug: "thunderstrike-impact",
  title: "Thunderstrike Impact",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
