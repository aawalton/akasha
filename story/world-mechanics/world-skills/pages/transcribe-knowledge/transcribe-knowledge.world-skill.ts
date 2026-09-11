import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const transcribeKnowledge = {
  id: "01a0657d-0316-719c-8aeb-d8b7063b3530",
  type: "world-skill",
  slug: "transcribe-knowledge",
  title: "Transcribe Knowledge",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
