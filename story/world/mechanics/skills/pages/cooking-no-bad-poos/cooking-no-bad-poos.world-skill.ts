import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const cookingNoBadPoos = {
  id: "01a06575-97fd-7f62-a800-841718d4bb16",
  type: "page-type/world-skill",
  slug: "cooking-no-bad-poos",
  title: "Cooking: No Bad Poos",
  world: "world/the-wandering-inn",
} as const satisfies WorldSkill
