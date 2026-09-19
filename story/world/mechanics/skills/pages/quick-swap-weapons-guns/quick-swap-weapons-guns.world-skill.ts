import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const quickSwapWeaponsGuns = {
  id: "01a0657d-029b-78f3-90bb-2276ba451d1d",
  type: "page-type/world-skill",
  slug: "quick-swap-weapons-guns",
  title: "Quick Swap Weapons (Guns)",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
