import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const mentalCanvas = {
  id: "01a0657d-024c-7fbd-98a5-31c9f65c8435",
  type: "page-type/world-skill",
  slug: "mental-canvas",
  title: "Mental Canvas",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
