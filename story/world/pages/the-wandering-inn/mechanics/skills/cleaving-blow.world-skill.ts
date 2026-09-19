import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const cleavingBlow = {
  id: "01a06575-97fb-765f-b149-4fe46e1be845",
  type: "page-type/world-skill",
  slug: "cleaving-blow",
  title: "Cleaving Blow",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
