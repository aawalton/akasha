import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const auraOfHaste = {
  id: "01a06575-97ee-7930-8df2-bdee74b2a6ac",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "aura-of-haste",
  title: "Aura of Haste",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
