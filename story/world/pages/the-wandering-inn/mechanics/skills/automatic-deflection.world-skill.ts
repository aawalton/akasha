import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const automaticDeflection = {
  id: "01a06575-97f0-7b65-9190-7128a7dfbce4",
  type: "page-type/world-skill",
  slug: "automatic-deflection",
  title: "Automatic Deflection",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
