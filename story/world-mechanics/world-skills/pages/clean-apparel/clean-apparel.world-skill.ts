import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const cleanApparel = {
  id: "01a06575-97fb-7cd9-aea4-69718c51bf67",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "clean-apparel",
  title: "Clean Apparel",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
