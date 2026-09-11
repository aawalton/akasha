import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const senseAttack = {
  id: "01a0657d-02b9-7d67-b246-bf038f383b5f",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "sense-attack",
  title: "Sense Attack",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
