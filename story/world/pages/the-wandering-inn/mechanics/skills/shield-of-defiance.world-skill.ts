import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const shieldOfDefiance = {
  id: "01a0657d-02c0-7901-93b2-ce7ebc3d100d",
  type: "page-type/world-skill",
  slug: "shield-of-defiance",
  title: "Shield of Defiance",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
