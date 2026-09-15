import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const identifyStragglers = {
  id: "01a06575-981c-78d5-9e19-eb948c7f79de",
  type: "world-skill",
  slug: "identify-stragglers",
  title: "Identify Stragglers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
