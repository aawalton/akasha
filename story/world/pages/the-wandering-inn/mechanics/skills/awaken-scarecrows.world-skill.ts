import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const awakenScarecrows = {
  id: "01a06575-97f2-7fcf-a993-953aa41d4b58",
  type: "page-type/world-skill",
  slug: "awaken-scarecrows",
  title: "Awaken Scarecrows",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
