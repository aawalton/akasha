import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const gardenOfSanctuary = {
  id: "01a06575-9814-731b-b5a8-0c8a0f8addd7",
  type: "world-skill",
  slug: "garden-of-sanctuary",
  title: "Garden of Sanctuary",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
