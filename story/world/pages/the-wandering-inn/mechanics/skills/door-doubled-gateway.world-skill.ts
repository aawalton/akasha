import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const doorDoubledGateway = {
  id: "01a06575-9804-7182-af57-a73c196bcff8",
  type: "page-type/world-skill",
  slug: "door-doubled-gateway",
  title: "Door: Doubled Gateway",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
