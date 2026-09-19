import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const perfectShot = {
  id: "01a0657d-028f-7f33-9cee-9bea610d25ed",
  type: "page-type/world-skill",
  slug: "perfect-shot",
  title: "Perfect Shot",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
