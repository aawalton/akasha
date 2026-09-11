import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const tameMonster = {
  id: "01a0657d-0310-7117-b64b-b7906575d523",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "tame-monster",
  title: "Tame Monster",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
