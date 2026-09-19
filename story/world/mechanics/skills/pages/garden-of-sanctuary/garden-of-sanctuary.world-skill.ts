import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const gardenOfSanctuary = {
  id: "01a06575-9814-731b-b5a8-0c8a0f8addd7",
  type: "page-type/world-skill",
  slug: "garden-of-sanctuary",
  title: "Garden of Sanctuary",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
