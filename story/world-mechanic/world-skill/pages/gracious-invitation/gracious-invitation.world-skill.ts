import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const graciousInvitation = {
  id: "01a06575-9816-7bbd-997b-914b7f49beea",
  type: "world-skill",
  slug: "gracious-invitation",
  title: "Gracious Invitation",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
