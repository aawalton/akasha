import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const perfectActionStealthRoll = {
  id: "01a0657d-028e-7527-b5f5-7b84ebab0987",
  type: "page-type/world-skill",
  slug: "perfect-action-stealth-roll",
  title: "Perfect Action: Stealth Roll",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
