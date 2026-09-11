import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const overwatch = {
  id: "01a0657d-027f-7b51-827d-ba90010134a6",
  type: "world-skill",
  slug: "overwatch",
  title: "Overwatch",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
