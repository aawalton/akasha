import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const delayTheDeal = {
  id: "01a06575-9802-766f-b549-f74c7bbb5fc0",
  type: "page-type/world-skill",
  slug: "delay-the-deal",
  title: "Delay the Deal",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
