import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const summonBoundTurret = {
  id: "01a0657d-02fe-7d5c-8685-4bfc6ee02e15",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "summon-bound-turret",
  title: "Summon Bound Turret",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
