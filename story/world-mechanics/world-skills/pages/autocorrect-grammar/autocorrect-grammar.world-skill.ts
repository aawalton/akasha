import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const autocorrectGrammar = {
  id: "01a06575-97f0-7c26-b50c-63d5cf20947e",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "autocorrect-grammar",
  title: "Autocorrect Grammar",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
