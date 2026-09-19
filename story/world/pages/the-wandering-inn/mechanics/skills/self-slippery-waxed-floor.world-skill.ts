import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const selfSlipperyWaxedFloor = {
  id: "01a0657d-02b8-7b9c-af1d-2ad9c858344e",
  type: "page-type/world-skill",
  slug: "self-slippery-waxed-floor",
  title: "Self: Slippery Waxed Floor",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
