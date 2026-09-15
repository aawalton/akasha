import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const burstOfSpeed = {
  id: "01a06575-97f9-759d-9acc-665a5af524e2",
  type: "world-skill",
  slug: "burst-of-speed",
  title: "Burst of Speed",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
