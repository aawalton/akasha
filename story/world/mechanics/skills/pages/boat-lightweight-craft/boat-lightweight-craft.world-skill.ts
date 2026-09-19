import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const boatLightweightCraft = {
  id: "01a06575-97f6-7b3f-a52b-9dfe453c95c0",
  type: "page-type/world-skill",
  slug: "boat-lightweight-craft",
  title: "Boat: Lightweight Craft",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
