import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const raiseTheStandard = {
  id: "01a0657d-029c-7c19-bc88-2e43ce9956ab",
  type: "page-type/world-skill",
  slug: "raise-the-standard",
  title: "Raise the Standard",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
