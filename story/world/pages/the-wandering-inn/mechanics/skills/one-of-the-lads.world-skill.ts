import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const oneOfTheLads = {
  id: "01a0657d-027c-7924-88bc-a4818ddbe5a8",
  type: "page-type/world-skill",
  slug: "one-of-the-lads",
  title: "One of the Lads",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
