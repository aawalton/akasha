import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const meaningfulLook = {
  id: "01a0657d-024c-7d45-a10b-5f75bade7cfd",
  type: "page-type/world-skill",
  slug: "meaningful-look",
  title: "Meaningful Look",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
