import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const bloodseeds = {
  id: "01a06575-97f6-7c24-bbeb-f71117ead429",
  type: "page-type/world-skill",
  slug: "bloodseeds",
  title: "Bloodseeds",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
