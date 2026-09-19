import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const shieldOfMana = {
  id: "01a0657d-02c0-7628-978d-35805c8da2bb",
  type: "page-type/world-skill",
  slug: "shield-of-mana",
  title: "Shield of Mana",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
