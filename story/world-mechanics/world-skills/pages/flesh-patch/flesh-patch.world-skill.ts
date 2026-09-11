import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const fleshPatch = {
  id: "01a06575-980e-7950-9679-d414dd341e36",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "flesh-patch",
  title: "Flesh Patch",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
