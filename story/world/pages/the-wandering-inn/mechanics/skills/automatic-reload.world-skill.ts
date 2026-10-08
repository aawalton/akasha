import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const automaticReload = {
  id: "01a06575-97f1-78f5-8a9a-af56e87194c3",
  type: "page-type/world-skill",
  slug: "automatic-reload",
  title: "Automatic Reload",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.561Z",
  updatedAt: "2026-09-22T13:31:40.000Z",
} as const satisfies WorldSkill
