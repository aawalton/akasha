import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const bodyStaunchedBleeding = {
  id: "01a06575-97f7-727f-8a3a-46d1a9213c00",
  type: "page-type/world-skill",
  slug: "body-staunched-bleeding",
  title: "Body: Staunched Bleeding",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
