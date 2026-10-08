import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const deathMagicProficiency = {
  id: "01a06575-9802-79bd-8049-4900e4b903e1",
  type: "page-type/world-skill",
  slug: "death-magic-proficiency",
  title: "Death Magic Proficiency",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.578Z",
  updatedAt: "2026-09-22T13:31:56.000Z",
} as const satisfies WorldSkill
