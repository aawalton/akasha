import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const longRangeCommand = {
  id: "01a0657d-0240-729f-908e-a3ea4230d656",
  type: "world-skill",
  slug: "long-range-command",
  title: "Long-Range Command",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
