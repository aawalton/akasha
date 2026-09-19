import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const purifyingBlood = {
  id: "01a0657d-029a-7c35-877d-e69fe699f215",
  type: "page-type/world-skill",
  slug: "purifying-blood",
  title: "Purifying Blood",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
