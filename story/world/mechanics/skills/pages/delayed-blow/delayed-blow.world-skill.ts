import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const delayedBlow = {
  id: "01a06575-9802-7c43-a6bd-d8fb3355ef72",
  type: "page-type/world-skill",
  slug: "delayed-blow",
  title: "Delayed Blow",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
