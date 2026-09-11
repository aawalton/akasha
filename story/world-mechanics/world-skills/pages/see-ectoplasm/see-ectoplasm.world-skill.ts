import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const seeEctoplasm = {
  id: "01a0657d-02b8-71e2-8195-333e7f46d7c3",
  type: "world-skill",
  slug: "see-ectoplasm",
  title: "See Ectoplasm",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
