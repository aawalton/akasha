import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const offenseMode = {
  id: "01a0657d-027b-7f0b-8e79-325bd3e282db",
  type: "world-skill",
  slug: "offense-mode",
  title: "Offense Mode",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
