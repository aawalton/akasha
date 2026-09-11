import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const freezeCriminal = {
  id: "01a06575-9810-731f-9426-c415d194a18c",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "freeze-criminal",
  title: "Freeze, Criminal",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
