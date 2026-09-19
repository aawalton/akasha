import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const tremorStomp = {
  id: "01a0657d-0316-7fbe-96c0-ad883195c15c",
  type: "page-type/world-skill",
  slug: "tremor-stomp",
  title: "Tremor Stomp",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
