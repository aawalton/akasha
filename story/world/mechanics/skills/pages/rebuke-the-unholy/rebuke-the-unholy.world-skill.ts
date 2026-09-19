import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const rebukeTheUnholy = {
  id: "01a0657d-02a5-7dbf-b73a-d4da13501c9c",
  type: "page-type/world-skill",
  slug: "rebuke-the-unholy",
  title: "Rebuke the Unholy",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
