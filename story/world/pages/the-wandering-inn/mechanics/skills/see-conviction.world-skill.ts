import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const seeConviction = {
  id: "01a0657d-02b8-7ed9-9891-e5b5313341d7",
  type: "page-type/world-skill",
  slug: "see-conviction",
  title: "See Conviction",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
