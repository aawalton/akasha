import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const aHeavyBlow = {
  id: "01a06575-97e7-76f2-9df0-774fc2235d4b",
  type: "page-type/world-skill",
  slug: "a-heavy-blow",
  title: "A Heavy Blow",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
