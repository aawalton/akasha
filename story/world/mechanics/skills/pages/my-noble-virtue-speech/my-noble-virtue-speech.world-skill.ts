import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const myNobleVirtueSpeech = {
  id: "01a0657d-0270-7f13-843f-f270d05dc652",
  type: "page-type/world-skill",
  slug: "my-noble-virtue-speech",
  title: "My Noble Virtue: Speech",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
