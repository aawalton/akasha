import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const bansheeSVoice = {
  id: "01a06575-97f2-7c43-b031-cadf56eacf89",
  type: "page-type/world-skill",
  slug: "banshee-s-voice",
  title: "Banshee’s Voice",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
