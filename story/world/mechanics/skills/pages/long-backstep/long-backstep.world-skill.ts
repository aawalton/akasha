import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const longBackstep = {
  id: "01a0657d-0240-71c2-a1ce-f736bcef6904",
  type: "page-type/world-skill",
  slug: "long-backstep",
  title: "Long Backstep",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
