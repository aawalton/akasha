import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const remoteManagement = {
  id: "01a0657d-02b0-7826-bbd3-379a8ec1288a",
  type: "world-skill",
  slug: "remote-management",
  title: "Remote Management",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
