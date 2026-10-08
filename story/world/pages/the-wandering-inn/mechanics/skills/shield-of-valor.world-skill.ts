import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const shieldOfValor = {
  id: "01a0657d-02c0-7def-9f2e-3181c0339941",
  type: "page-type/world-skill",
  slug: "shield-of-valor",
  title: "Shield of Valor",
  world: "world/the-wandering-inn",
  appearanceCount: 13,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.656Z",
  updatedAt: "2026-09-22T13:33:17.000Z",
} as const satisfies WorldSkill
