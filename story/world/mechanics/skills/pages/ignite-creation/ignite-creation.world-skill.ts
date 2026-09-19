import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const igniteCreation = {
  id: "01a06575-981c-7749-bec2-8e838e3621c0",
  type: "page-type/world-skill",
  slug: "ignite-creation",
  title: "Ignite Creation",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
