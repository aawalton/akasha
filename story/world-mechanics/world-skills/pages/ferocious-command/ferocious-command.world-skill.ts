import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const ferociousCommand = {
  id: "01a06575-980c-75b2-8da3-7b122bcecaef",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "ferocious-command",
  title: "Ferocious Command",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
