import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const subjectiveSpellcheck = {
  id: "01a0657d-02fe-78b8-96af-d91032c80b06",
  type: "page-type/world-skill",
  slug: "subjective-spellcheck",
  title: "Subjective Spellcheck",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
