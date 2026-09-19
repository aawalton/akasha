import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const listenToMe = {
  id: "01a0657d-0240-74dc-a934-93ff79b55338",
  type: "page-type/world-skill",
  slug: "listen-to-me",
  title: "Listen to Me",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
