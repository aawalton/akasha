import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fearlessLanceCharge = {
  id: "01a06575-980c-741a-8686-b84b6b3bd0f5",
  type: "page-type/world-skill",
  slug: "fearless-lance-charge",
  title: "Fearless Lance Charge",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
