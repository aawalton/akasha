import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const heedMyInstructions = {
  id: "01a06575-9819-7e0a-a32b-534dc3f77296",
  type: "page-type/world-skill",
  slug: "heed-my-instructions",
  title: "Heed My Instructions",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
