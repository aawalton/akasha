import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const courageousSpeech = {
  id: "01a06575-97fe-72b1-af6b-744b90113118",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "courageous-speech",
  title: "Courageous Speech",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
