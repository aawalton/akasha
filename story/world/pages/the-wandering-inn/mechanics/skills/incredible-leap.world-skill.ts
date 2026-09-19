import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const incredibleLeap = {
  id: "01a06575-981e-7679-b845-8b0cae51a7f6",
  type: "page-type/world-skill",
  slug: "incredible-leap",
  title: "Incredible Leap",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
