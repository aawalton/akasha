import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const detectFlaw = {
  id: "01a06575-9803-737d-9c43-17a4deb0faf5",
  type: "page-type/world-skill",
  slug: "detect-flaw",
  title: "Detect Flaw",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.579Z",
  updatedAt: "2026-09-22T13:31:56.000Z",
} as const satisfies WorldSkill
