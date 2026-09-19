import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const cleanApparel = {
  id: "01a06575-97fb-7cd9-aea4-69718c51bf67",
  type: "page-type/world-skill",
  slug: "clean-apparel",
  title: "Clean Apparel",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
