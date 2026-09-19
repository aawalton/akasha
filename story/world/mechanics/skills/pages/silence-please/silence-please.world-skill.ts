import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const silencePlease = {
  id: "01a0657d-02c1-7187-b5ff-3bd3c4f93a1a",
  type: "page-type/world-skill",
  slug: "silence-please",
  title: "Silence, Please",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
