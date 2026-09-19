import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const goodAim = {
  id: "01a06575-9815-7c94-8560-852f21f98003",
  type: "page-type/world-skill",
  slug: "good-aim",
  title: "Good Aim",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
