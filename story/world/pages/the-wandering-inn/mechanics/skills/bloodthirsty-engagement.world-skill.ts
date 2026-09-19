import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const bloodthirstyEngagement = {
  id: "01a06575-97f6-75d8-a9fd-f19e8d067f30",
  type: "page-type/world-skill",
  slug: "bloodthirsty-engagement",
  title: "Bloodthirsty Engagement",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
