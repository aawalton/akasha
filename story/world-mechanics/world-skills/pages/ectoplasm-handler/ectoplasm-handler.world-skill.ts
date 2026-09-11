import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const ectoplasmHandler = {
  id: "01a06575-9806-77cb-a785-36f78f6bd6a2",
  type: "world-skill",
  slug: "ectoplasm-handler",
  title: "Ectoplasm Handler",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
