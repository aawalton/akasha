import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const massedAttack = {
  id: "01a0657d-024b-7b89-88c3-a5bc3e1435ae",
  type: "page-type/world-skill",
  slug: "massed-attack",
  title: "Massed Attack",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
