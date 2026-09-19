import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const noCurseLastsForever = {
  id: "01a0657d-027b-7da9-aaf9-6638e70a66fa",
  type: "page-type/world-skill",
  slug: "no-curse-lasts-forever",
  title: "No Curse Lasts Forever",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
