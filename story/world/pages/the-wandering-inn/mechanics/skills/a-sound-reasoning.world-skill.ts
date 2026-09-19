import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const aSoundReasoning = {
  id: "01a06575-97e7-73c2-8637-e39e501a3d75",
  type: "page-type/world-skill",
  slug: "a-sound-reasoning",
  title: "A Sound Reasoning",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
