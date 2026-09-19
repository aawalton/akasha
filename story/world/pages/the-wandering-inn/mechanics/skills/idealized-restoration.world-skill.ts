import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const idealizedRestoration = {
  id: "01a06575-981c-75ef-8778-5dd62cbe4172",
  type: "page-type/world-skill",
  slug: "idealized-restoration",
  title: "Idealized Restoration",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
