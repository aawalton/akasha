import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const senseAttack = {
  id: "01a0657d-02b9-7d67-b246-bf038f383b5f",
  type: "page-type/world-skill",
  slug: "sense-attack",
  title: "Sense Attack",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
