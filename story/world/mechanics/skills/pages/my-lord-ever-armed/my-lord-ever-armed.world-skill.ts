import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const myLordEverArmed = {
  id: "01a0657d-0270-7552-bba5-39cab717ec2e",
  type: "page-type/world-skill",
  slug: "my-lord-ever-armed",
  title: "My Lord, Ever Armed",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
