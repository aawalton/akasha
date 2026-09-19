import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const vanguardSAdvance = {
  id: "01a0657d-0320-7968-9f0a-8a74fae73eb8",
  type: "page-type/world-skill",
  slug: "vanguard-s-advance",
  title: "Vanguard’s Advance",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
