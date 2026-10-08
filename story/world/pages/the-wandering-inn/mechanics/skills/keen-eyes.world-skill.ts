import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const keenEyes = {
  id: "01a06575-9821-730f-bd94-a6212ff72697",
  type: "page-type/world-skill",
  slug: "keen-eyes",
  title: "Keen Eyes",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  evolvesToSlugs: ["world-skill/eagle-eyes"],
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.609Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldSkill
