import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const sealDoorKingshield = {
  id: "01a0657d-02b8-7dfe-a84c-9ba3b9815b71",
  type: "page-type/world-skill",
  slug: "seal-door-kingshield",
  title: "Seal Door (Kingshield)",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
