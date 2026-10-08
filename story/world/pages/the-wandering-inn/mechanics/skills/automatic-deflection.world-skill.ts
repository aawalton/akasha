import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const automaticDeflection = {
  id: "01a06575-97f0-7b65-9190-7128a7dfbce4",
  type: "page-type/world-skill",
  slug: "automatic-deflection",
  title: "Automatic Deflection",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.560Z",
  updatedAt: "2026-09-22T13:31:40.000Z",
} as const satisfies WorldSkill
