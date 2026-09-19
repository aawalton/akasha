import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const surefoot = {
  id: "01a0657d-0303-7053-904e-47968ac927c1",
  type: "page-type/world-skill",
  slug: "surefoot",
  title: "Surefoot",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
