import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const immobilizingTouch = {
  id: "01a06575-981c-7d89-986d-cae654d7c170",
  type: "page-type/world-skill",
  slug: "immobilizing-touch",
  title: "Immobilizing Touch",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.604Z",
  updatedAt: "2026-09-22T13:32:27.000Z",
} as const satisfies WorldSkill
