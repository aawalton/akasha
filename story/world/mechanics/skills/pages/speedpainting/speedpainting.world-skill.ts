import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const speedpainting = {
  id: "01a0657d-02ed-7b49-86fb-8cb848f85dec",
  type: "page-type/world-skill",
  slug: "speedpainting",
  title: "Speedpainting",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
