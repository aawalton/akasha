import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const rejuvenatingTouch = {
  id: "01a0657d-02af-713b-92f8-4b27c53af1c3",
  type: "page-type/world-skill",
  slug: "rejuvenating-touch",
  title: "Rejuvenating Touch",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
