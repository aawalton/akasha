import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const healthyRearing = {
  id: "01a06575-9819-7444-b0d0-674f804e313a",
  type: "page-type/world-skill",
  slug: "healthy-rearing",
  title: "Healthy Rearing",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
