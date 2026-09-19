import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const grinderTeeth = {
  id: "01a06575-9817-7e1d-8613-1ce17a400077",
  type: "page-type/world-skill",
  slug: "grinder-teeth",
  title: "Grinder Teeth",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
