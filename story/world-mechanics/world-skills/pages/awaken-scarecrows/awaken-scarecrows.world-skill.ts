import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const awakenScarecrows = {
  id: "01a06575-97f2-7fcf-a993-953aa41d4b58",
  type: "world-skill",
  slug: "awaken-scarecrows",
  title: "Awaken Scarecrows",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
