import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const quickSprint = {
  id: "01a0657d-029b-7335-9dfb-11bdd7892093",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "quick-sprint",
  title: "Quick Sprint",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
