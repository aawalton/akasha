import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const faintPresence = {
  id: "01a06575-980b-7233-80be-dde163182b40",
  type: "page-type/world-skill",
  slug: "faint-presence",
  title: "Faint Presence",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.587Z",
  updatedAt: "2026-09-22T13:32:12.000Z",
} as const satisfies WorldSkill
