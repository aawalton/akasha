import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const hardenMetal = {
  id: "01a06575-9818-7e58-b60a-cbc7de7e6088",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "harden-metal",
  title: "Harden Metal",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
