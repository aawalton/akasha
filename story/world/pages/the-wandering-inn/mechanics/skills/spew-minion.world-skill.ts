import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const spewMinion = {
  id: "01a0657d-02ed-7025-99d3-0d156c3cf38e",
  type: "page-type/world-skill",
  slug: "spew-minion",
  title: "Spew Minion",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
