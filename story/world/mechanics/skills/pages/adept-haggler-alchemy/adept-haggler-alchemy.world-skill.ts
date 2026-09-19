import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const adeptHagglerAlchemy = {
  id: "01a06575-97e9-7245-8bed-dc4872a1978d",
  type: "page-type/world-skill",
  slug: "adept-haggler-alchemy",
  title: "Adept Haggler (Alchemy)",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
