import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const prospectiveClient = {
  id: "01a0657d-0297-7fd5-ae2f-34caa43f61d7",
  type: "page-type/world-skill",
  slug: "prospective-client",
  title: "Prospective Client",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
