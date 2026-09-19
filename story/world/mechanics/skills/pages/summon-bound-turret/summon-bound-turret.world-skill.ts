import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const summonBoundTurret = {
  id: "01a0657d-02fe-7d5c-8685-4bfc6ee02e15",
  type: "page-type/world-skill",
  slug: "summon-bound-turret",
  title: "Summon Bound Turret",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
