import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const copySkill = {
  id: "01a06575-97fe-758f-a185-bba87b36983d",
  type: "world-skill",
  slug: "copy-skill",
  title: "Copy Skill",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
