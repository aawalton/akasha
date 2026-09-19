import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const twentyFootSweep = {
  id: "01a0657d-0317-7740-b83c-be53b5bc069b",
  type: "page-type/world-skill",
  slug: "twenty-foot-sweep",
  title: "Twenty-Foot Sweep",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
