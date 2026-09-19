import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const delayedReload = {
  id: "01a06575-9802-74bc-98bb-cb8d2830abc1",
  type: "page-type/world-skill",
  slug: "delayed-reload",
  title: "Delayed Reload",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
