import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const eagleEyes = {
  id: "01a06575-9806-7219-85db-4ab03c9614c4",
  type: "page-type/world-skill",
  slug: "eagle-eyes",
  title: "Eagle Eyes",
  world: "world/the-wandering-inn",
  appearanceCount: 12,
  evolvesFromSlugs: ["world-skill/keen-eyes"],
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.582Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldSkill
