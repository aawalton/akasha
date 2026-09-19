import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const summonPatrol = {
  id: "01a0657d-02fe-7a16-8368-1bbc7278f615",
  type: "page-type/world-skill",
  slug: "summon-patrol",
  title: "Summon Patrol",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
