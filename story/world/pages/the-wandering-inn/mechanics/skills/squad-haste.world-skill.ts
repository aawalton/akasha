import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const squadHaste = {
  id: "01a0657d-02ee-756a-b3db-4ab3df0a68ff",
  type: "page-type/world-skill",
  slug: "squad-haste",
  title: "Squad: Haste",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
