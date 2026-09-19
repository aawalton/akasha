import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const rejectToxins = {
  id: "01a0657d-02af-7c71-af66-af673e4e9328",
  type: "page-type/world-skill",
  slug: "reject-toxins",
  title: "Reject Toxins",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
