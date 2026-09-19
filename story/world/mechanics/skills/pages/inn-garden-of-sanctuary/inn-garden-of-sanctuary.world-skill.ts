import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const innGardenOfSanctuary = {
  id: "01a06575-981f-71b5-b65c-a29329902ed8",
  type: "page-type/world-skill",
  slug: "inn-garden-of-sanctuary",
  title: "Inn: Garden of Sanctuary",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
