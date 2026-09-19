import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const leapingFishCombo = {
  id: "01a06575-9822-7b22-8a35-0d0d6b74cdfa",
  type: "page-type/world-skill",
  slug: "leaping-fish-combo",
  title: "Leaping Fish Combo",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
