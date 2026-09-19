import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const battlefieldVoice = {
  id: "01a06575-97f4-78da-b826-abc11119acb8",
  type: "page-type/world-skill",
  slug: "battlefield-voice",
  title: "Battlefield Voice",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
