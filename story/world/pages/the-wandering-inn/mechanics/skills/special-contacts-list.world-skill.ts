import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const specialContactsList = {
  id: "01a0657d-02ed-738b-87dc-8807970d018d",
  type: "page-type/world-skill",
  slug: "special-contacts-list",
  title: "Special Contacts List",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
