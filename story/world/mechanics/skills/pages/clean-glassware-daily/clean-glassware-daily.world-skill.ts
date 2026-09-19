import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const cleanGlasswareDaily = {
  id: "01a06575-97fb-7ff4-96de-d2512a4c85c1",
  type: "page-type/world-skill",
  slug: "clean-glassware-daily",
  title: "Clean Glassware (Daily)",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
