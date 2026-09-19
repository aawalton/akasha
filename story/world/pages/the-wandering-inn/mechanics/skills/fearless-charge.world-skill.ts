import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fearlessCharge = {
  id: "01a06575-980c-7c64-8aa4-2f68312d6b56",
  type: "page-type/world-skill",
  slug: "fearless-charge",
  title: "Fearless Charge",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
