import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const shieldOfValor = {
  id: "01a0657d-02c0-7def-9f2e-3181c0339941",
  type: "page-type/world-skill",
  slug: "shield-of-valor",
  title: "Shield of Valor",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
