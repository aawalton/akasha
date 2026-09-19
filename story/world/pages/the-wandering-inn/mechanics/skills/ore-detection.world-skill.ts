import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const oreDetection = {
  id: "01a0657d-027c-75c8-8885-582e850047ab",
  type: "page-type/world-skill",
  slug: "ore-detection",
  title: "Ore Detection",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
