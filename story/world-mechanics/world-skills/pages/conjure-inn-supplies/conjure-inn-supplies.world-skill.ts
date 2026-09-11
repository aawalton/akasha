import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const conjureInnSupplies = {
  id: "01a06575-97fc-7af1-86f4-d6ee4b7259b5",
  type: "world-skill",
  slug: "conjure-inn-supplies",
  title: "Conjure: Inn Supplies",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
