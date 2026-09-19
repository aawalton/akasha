import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const wideSweep = {
  id: "01a0657d-032e-7161-a331-880d900adbf7",
  type: "page-type/world-skill",
  slug: "wide-sweep",
  title: "Wide Sweep",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
