import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const tenSecondRoutine = {
  id: "01a0657d-0311-7cd2-8baf-017639ffce63",
  type: "page-type/world-skill",
  slug: "ten-second-routine",
  title: "Ten Second Routine",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
