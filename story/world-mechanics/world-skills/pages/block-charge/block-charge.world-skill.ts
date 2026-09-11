import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const blockCharge = {
  id: "01a06575-97f6-7592-b143-411fbb600933",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "block-charge",
  title: "Block Charge",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
