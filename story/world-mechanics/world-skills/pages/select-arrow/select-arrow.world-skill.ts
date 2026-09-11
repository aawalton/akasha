import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const selectArrow = {
  id: "01a0657d-02b8-7341-a159-6c39fe738106",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "select-arrow",
  title: "Select Arrow",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
