import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const machPunch = {
  id: "01a0657d-0241-777f-af8d-a61c3923680c",
  type: "page-type/world-skill",
  slug: "mach-punch",
  title: "Mach Punch",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
