import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const gracefulStep = {
  id: "01a06575-9816-7374-9a31-a1f1c554354f",
  type: "page-type/world-skill",
  slug: "graceful-step",
  title: "Graceful Step",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
