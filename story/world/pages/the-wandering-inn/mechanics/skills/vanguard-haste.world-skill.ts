import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const vanguardHaste = {
  id: "01a0657d-0320-7dae-93ea-6c754d0e774f",
  type: "page-type/world-skill",
  slug: "vanguard-haste",
  title: "Vanguard: Haste",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
