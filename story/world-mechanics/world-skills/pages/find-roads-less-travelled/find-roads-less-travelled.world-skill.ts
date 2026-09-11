import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const findRoadsLessTravelled = {
  id: "01a06575-980c-721f-bf9a-6d1e00fd4f4b",
  type: "world-skill",
  slug: "find-roads-less-travelled",
  title: "Find Roads Less Travelled",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
