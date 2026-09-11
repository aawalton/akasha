import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const leaseLesserRoom = {
  id: "01a06575-9822-7454-9e33-ce59a81ebc0f",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "lease-lesser-room",
  title: "Lease Lesser Room",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
