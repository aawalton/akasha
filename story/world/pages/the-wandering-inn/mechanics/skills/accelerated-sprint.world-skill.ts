import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const acceleratedSprint = {
  id: "01a06575-97e8-777f-9a42-683d99feb046",
  type: "page-type/world-skill",
  slug: "accelerated-sprint",
  title: "Accelerated Sprint",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
