import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const boundSkillMyArrowShallNotStop = {
  id: "01a06575-97f8-77ef-839f-c1bf600f1abc",
  type: "page-type/world-skill",
  slug: "bound-skill-my-arrow-shall-not-stop",
  title: "Bound Skill: My Arrow Shall Not Stop",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
