import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const excellentDiction = {
  id: "01a06575-9809-73e6-92f2-39736aae1629",
  type: "page-type/world-skill",
  slug: "excellent-diction",
  title: "Excellent Diction",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
