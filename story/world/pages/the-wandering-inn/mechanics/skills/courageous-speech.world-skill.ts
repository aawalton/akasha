import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const courageousSpeech = {
  id: "01a06575-97fe-72b1-af6b-744b90113118",
  type: "page-type/world-skill",
  slug: "courageous-speech",
  title: "Courageous Speech",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
