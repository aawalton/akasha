import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const commandingVoice = {
  id: "01a06575-97fc-7142-a43c-f0b1b5f4afc4",
  type: "page-type/world-skill",
  slug: "commanding-voice",
  title: "Commanding Voice",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
