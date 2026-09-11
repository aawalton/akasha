import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const delegateSkill = {
  id: "01a06575-9802-7224-9a0b-a71a625c9adf",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "delegate-skill",
  title: "Delegate Skill",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
