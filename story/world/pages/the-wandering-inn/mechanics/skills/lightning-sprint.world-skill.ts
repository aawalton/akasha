import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const lightningSprint = {
  id: "01a0657d-023f-7757-9f1f-9803e440bd21",
  type: "page-type/world-skill",
  slug: "lightning-sprint",
  title: "Lightning Sprint",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
