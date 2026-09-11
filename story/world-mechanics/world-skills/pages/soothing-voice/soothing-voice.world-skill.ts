import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const soothingVoice = {
  id: "01a0657d-02c7-744d-a047-a50eb13505f9",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "soothing-voice",
  title: "Soothing Voice",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
