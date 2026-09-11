import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const oilSpray = {
  id: "01a0657d-027c-7d38-9559-32e78481f5f5",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "oil-spray",
  title: "Oil Spray",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
