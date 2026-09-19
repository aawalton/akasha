import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const bodyFirebreath = {
  id: "01a06575-97f6-7eab-836c-94a7636ddc95",
  type: "page-type/world-skill",
  slug: "body-firebreath",
  title: "Body: Firebreath",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
