import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const tranquilSkies = {
  id: "01a0657d-0316-780c-aa2c-5ebc1f4d5d87",
  type: "page-type/world-skill",
  slug: "tranquil-skies",
  title: "Tranquil Skies",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
