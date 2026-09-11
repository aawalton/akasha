import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const heavyBlow = {
  id: "01a06575-9819-7a27-a240-f4e0ddfee1dd",
  type: "world-skill",
  slug: "heavy-blow",
  title: "Heavy Blow",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
