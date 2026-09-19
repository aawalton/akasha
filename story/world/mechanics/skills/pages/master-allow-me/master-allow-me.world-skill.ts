import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const masterAllowMe = {
  id: "01a0657d-024b-79d9-9dbd-7c87f3d41c7a",
  type: "page-type/world-skill",
  slug: "master-allow-me",
  title: "Master, Allow Me",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
