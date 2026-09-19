import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const timeToChat = {
  id: "01a0657d-0315-79fb-8496-3bff239c960b",
  type: "page-type/world-skill",
  slug: "time-to-chat",
  title: "Time to Chat",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
