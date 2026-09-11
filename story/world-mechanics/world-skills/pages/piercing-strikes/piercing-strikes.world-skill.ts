import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const piercingStrikes = {
  id: "01a0657d-0294-7ae2-9d69-f73079bc8146",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "piercing-strikes",
  title: "Piercing Strikes",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
