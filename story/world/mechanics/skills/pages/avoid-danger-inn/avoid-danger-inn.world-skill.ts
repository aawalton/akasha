import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const avoidDangerInn = {
  id: "01a06575-97f2-784a-bda3-cd9c27546fb1",
  type: "page-type/world-skill",
  slug: "avoid-danger-inn",
  title: "Avoid Danger: Inn",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
