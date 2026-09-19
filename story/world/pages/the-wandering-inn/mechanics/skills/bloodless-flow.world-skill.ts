import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const bloodlessFlow = {
  id: "01a06575-97f6-7215-a446-674dbbcda536",
  type: "page-type/world-skill",
  slug: "bloodless-flow",
  title: "Bloodless Flow",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
