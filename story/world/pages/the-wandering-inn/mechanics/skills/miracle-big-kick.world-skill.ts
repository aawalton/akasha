import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const miracleBigKick = {
  id: "01a0657d-026d-7bc9-90bc-9d585935c800",
  type: "page-type/world-skill",
  slug: "miracle-big-kick",
  title: "Miracle: Big Kick",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
