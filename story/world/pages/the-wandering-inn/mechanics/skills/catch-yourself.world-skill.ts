import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const catchYourself = {
  id: "01a06575-97fa-71a9-92ae-c64382bb1f99",
  type: "page-type/world-skill",
  slug: "catch-yourself",
  title: "Catch Yourself",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.570Z",
  updatedAt: "2026-09-22T13:31:48.000Z",
} as const satisfies WorldSkill
