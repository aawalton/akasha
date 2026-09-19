import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const shieldlineWall = {
  id: "01a0657d-02c0-794a-899a-20bfded64e47",
  type: "page-type/world-skill",
  slug: "shieldline-wall",
  title: "Shieldline Wall",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
