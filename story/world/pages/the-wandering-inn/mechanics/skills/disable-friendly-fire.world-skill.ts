import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const disableFriendlyFire = {
  id: "01a06575-9803-7eb2-8530-61805b5f2c0e",
  type: "page-type/world-skill",
  slug: "disable-friendly-fire",
  title: "Disable Friendly Fire",
  world: "world/the-wandering-inn",
  appearanceCount: 5,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.579Z",
  updatedAt: "2026-09-22T13:32:04.000Z",
} as const satisfies WorldSkill
