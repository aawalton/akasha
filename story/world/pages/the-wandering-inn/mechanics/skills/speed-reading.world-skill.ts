import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const speedReading = {
  id: "01a0657d-02ed-7322-9db0-f1eed7971f1f",
  type: "page-type/world-skill",
  slug: "speed-reading",
  title: "Speed Reading",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
