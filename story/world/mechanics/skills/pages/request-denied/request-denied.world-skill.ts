import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const requestDenied = {
  id: "01a0657d-02b1-7feb-b792-65a6c169c18f",
  type: "page-type/world-skill",
  slug: "request-denied",
  title: "Request Denied",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
