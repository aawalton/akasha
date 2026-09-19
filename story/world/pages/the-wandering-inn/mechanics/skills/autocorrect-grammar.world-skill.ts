import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const autocorrectGrammar = {
  id: "01a06575-97f0-7c26-b50c-63d5cf20947e",
  type: "page-type/world-skill",
  slug: "autocorrect-grammar",
  title: "Autocorrect Grammar",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
