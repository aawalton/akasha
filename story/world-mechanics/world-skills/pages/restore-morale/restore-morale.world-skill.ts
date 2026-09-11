import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const restoreMorale = {
  id: "01a0657d-02b1-7ada-ba4d-cc0391f53ce9",
  type: "world-skill",
  slug: "restore-morale",
  title: "Restore Morale",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
