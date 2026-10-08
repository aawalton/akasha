import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const shieldOfMana = {
  id: "01a0657d-02c0-7628-978d-35805c8da2bb",
  type: "page-type/world-skill",
  slug: "shield-of-mana",
  title: "Shield of Mana",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.656Z",
  updatedAt: "2026-09-22T13:33:17.000Z",
} as const satisfies WorldSkill
