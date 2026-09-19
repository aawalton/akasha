import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const impalingLunge = {
  id: "01a06575-981d-7e1e-b001-0af98bebedc7",
  type: "page-type/world-skill",
  slug: "impaling-lunge",
  title: "Impaling Lunge",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
