import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const emergencyRegeneration = {
  id: "01a06575-9807-7847-aef0-aaaeefd38aab",
  type: "page-type/world-skill",
  slug: "emergency-regeneration",
  title: "Emergency Regeneration",
  world: "world/the-wandering-inn",
  aliases: ["Emergency…Regeneration"],
  references: "jsonl",
} as const satisfies WorldSkill
