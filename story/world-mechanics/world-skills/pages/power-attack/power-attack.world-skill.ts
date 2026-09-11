import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const powerAttack = {
  id: "01a0657d-0295-74d4-9548-76c6cb44774d",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "power-attack",
  title: "Power Attack",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
