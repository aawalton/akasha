import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const engagingDiscourse = {
  id: "01a06575-9808-7e56-8636-9e99339be2ad",
  type: "page-type/world-skill",
  slug: "engaging-discourse",
  title: "Engaging Discourse",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
