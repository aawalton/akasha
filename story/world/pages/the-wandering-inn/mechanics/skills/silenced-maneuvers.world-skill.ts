import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const silencedManeuvers = {
  id: "01a0657d-02c1-74c5-be90-3f68548e8be3",
  type: "page-type/world-skill",
  slug: "silenced-maneuvers",
  title: "Silenced Maneuvers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
