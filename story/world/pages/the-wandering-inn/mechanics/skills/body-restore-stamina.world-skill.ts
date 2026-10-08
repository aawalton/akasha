import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const bodyRestoreStamina = {
  id: "01a06575-97f7-78b2-b014-1deb4ee702fc",
  type: "page-type/world-skill",
  slug: "body-restore-stamina",
  title: "Body: Restore Stamina",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.567Z",
  updatedAt: "2026-09-22T13:31:48.000Z",
} as const satisfies WorldSkill
