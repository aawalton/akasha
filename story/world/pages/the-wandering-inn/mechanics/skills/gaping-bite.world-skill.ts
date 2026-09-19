import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const gapingBite = {
  id: "01a06575-9811-719a-bacd-72012ab823eb",
  type: "page-type/world-skill",
  slug: "gaping-bite",
  title: "Gaping Bite",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
