import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const acidGlobule = {
  id: "01a06575-97e8-7d81-a947-893a27dd6c90",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "acid-globule",
  title: "Acid Globule",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
