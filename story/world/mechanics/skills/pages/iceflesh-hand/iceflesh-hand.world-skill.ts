import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const icefleshHand = {
  id: "01a06575-981c-7838-a11e-2e3d6f2a08d2",
  type: "page-type/world-skill",
  slug: "iceflesh-hand",
  title: "Iceflesh Hand",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
