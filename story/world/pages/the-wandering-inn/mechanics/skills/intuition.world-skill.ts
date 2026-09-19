import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const intuition = {
  id: "01a06575-9820-797a-b720-2f15700bcc1c",
  type: "page-type/world-skill",
  slug: "intuition",
  title: "Intuition",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
