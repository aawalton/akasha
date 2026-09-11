import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const leaseRoom = {
  id: "01a06575-9822-7604-97b8-914c661acfce",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "lease-room",
  title: "Lease Room",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
