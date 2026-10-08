import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const rejectToxins = {
  id: "01a0657d-02af-7c71-af66-af673e4e9328",
  type: "page-type/world-skill",
  slug: "reject-toxins",
  title: "Reject Toxins",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.639Z",
  updatedAt: "2026-09-22T13:33:09.000Z",
} as const satisfies WorldSkill
