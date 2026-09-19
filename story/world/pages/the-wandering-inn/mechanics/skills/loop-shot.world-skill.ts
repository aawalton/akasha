import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const loopShot = {
  id: "01a0657d-0241-7792-a8fb-c98217b34880",
  type: "page-type/world-skill",
  slug: "loop-shot",
  title: "Loop Shot",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
