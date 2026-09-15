import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const auraBatteringRam = {
  id: "01a06575-97ee-7c18-9789-47277e8d7bdb",
  type: "world-skill",
  slug: "aura-battering-ram",
  title: "Aura: Battering Ram",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
