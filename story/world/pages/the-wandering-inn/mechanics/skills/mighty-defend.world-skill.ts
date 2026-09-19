import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const mightyDefend = {
  id: "01a0657d-024d-725a-944c-6a29ba0c2106",
  type: "page-type/world-skill",
  slug: "mighty-defend",
  title: "Mighty Defend",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
