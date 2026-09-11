import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const kitchenRemoteManagement = {
  id: "01a06575-9821-720f-8b87-d67cd8b81130",
  type: "world-skill",
  slug: "kitchen-remote-management",
  title: "Kitchen: Remote Management",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
