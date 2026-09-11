import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const enforceContract = {
  id: "01a06575-9808-7d04-aa08-b2c7f762cff2",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "enforce-contract",
  title: "Enforce Contract",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
