import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const luckyDodge = {
  id: "01a0657d-0241-73bc-9c52-6397693a3bfc",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "lucky-dodge",
  title: "Lucky Dodge",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
