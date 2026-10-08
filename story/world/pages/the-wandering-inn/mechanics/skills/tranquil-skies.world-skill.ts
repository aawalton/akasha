import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const tranquilSkies = {
  id: "01a0657d-0316-780c-aa2c-5ebc1f4d5d87",
  type: "page-type/world-skill",
  slug: "tranquil-skies",
  title: "Tranquil Skies",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.742Z",
  updatedAt: "2026-09-22T13:33:42.000Z",
} as const satisfies WorldSkill
