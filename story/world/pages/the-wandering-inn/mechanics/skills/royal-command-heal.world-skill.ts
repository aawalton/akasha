import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const royalCommandHeal = {
  id: "01a0657d-02b7-7ff9-8707-d01e523f2608",
  type: "page-type/world-skill",
  slug: "royal-command-heal",
  title: "Royal Command: Heal",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
