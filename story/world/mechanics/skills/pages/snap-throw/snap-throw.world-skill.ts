import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const snapThrow = {
  id: "01a0657d-02c7-7816-8db3-69ffdcf35311",
  type: "page-type/world-skill",
  slug: "snap-throw",
  title: "Snap Throw",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
