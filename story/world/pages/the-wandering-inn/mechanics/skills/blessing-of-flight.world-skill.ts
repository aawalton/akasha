import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const blessingOfFlight = {
  id: "01a06575-97f6-7272-950d-5b39f38956dc",
  type: "page-type/world-skill",
  slug: "blessing-of-flight",
  title: "Blessing of Flight",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
