import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const exhaustiveMemory = {
  id: "01a06575-9809-7e94-a968-eea719bd7e64",
  type: "world-skill",
  slug: "exhaustive-memory",
  title: "Exhaustive Memory",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
