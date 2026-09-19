import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const judgeOfNobility = {
  id: "01a06575-9821-7ffb-bc87-0dd24512ed0a",
  type: "page-type/world-skill",
  slug: "judge-of-nobility",
  title: "Judge of Nobility",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
