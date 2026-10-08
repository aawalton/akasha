import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const slavesCannotHarmMe = {
  id: "01a0657d-02c6-704e-9096-ba3fe4e2a8cc",
  type: "page-type/world-skill",
  slug: "slaves-cannot-harm-me",
  title: "Slaves Cannot Harm Me",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.662Z",
  updatedAt: "2026-09-22T13:33:26.000Z",
} as const satisfies WorldSkill
