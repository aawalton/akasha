import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const reporterSPrivilege = {
  id: "01a0657d-02b1-75f6-926f-1f2fa940789d",
  type: "world-skill",
  slug: "reporter-s-privilege",
  title: "Reporter’s Privilege",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
