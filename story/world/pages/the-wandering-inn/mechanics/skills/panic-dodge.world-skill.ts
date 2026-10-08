import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const panicDodge = {
  id: "01a0657d-0286-7f54-94bd-85359489f110",
  type: "page-type/world-skill",
  slug: "panic-dodge",
  title: "Panic Dodge",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.598Z",
  updatedAt: "2026-09-22T13:32:52.000Z",
} as const satisfies WorldSkill
