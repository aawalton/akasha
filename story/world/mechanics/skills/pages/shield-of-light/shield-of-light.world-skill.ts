import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const shieldOfLight = {
  id: "01a0657d-02c0-7835-aad3-c41010920858",
  type: "page-type/world-skill",
  slug: "shield-of-light",
  title: "Shield of Light",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
