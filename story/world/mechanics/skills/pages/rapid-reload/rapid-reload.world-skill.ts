import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const rapidReload = {
  id: "01a0657d-02a4-76df-982b-1e26d084b8f0",
  type: "page-type/world-skill",
  slug: "rapid-reload",
  title: "Rapid Reload",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
