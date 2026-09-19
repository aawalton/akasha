import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const politeDeflection = {
  id: "01a0657d-0295-7388-8cb0-b15d4890e717",
  type: "page-type/world-skill",
  slug: "polite-deflection",
  title: "Polite Deflection",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
