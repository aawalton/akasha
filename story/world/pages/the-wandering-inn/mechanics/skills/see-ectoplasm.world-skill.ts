import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const seeEctoplasm = {
  id: "01a0657d-02b8-71e2-8195-333e7f46d7c3",
  type: "page-type/world-skill",
  slug: "see-ectoplasm",
  title: "See Ectoplasm",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.648Z",
  updatedAt: "2026-09-22T13:33:17.000Z",
} as const satisfies WorldSkill
