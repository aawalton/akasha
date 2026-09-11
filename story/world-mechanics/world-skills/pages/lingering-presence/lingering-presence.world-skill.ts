import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const lingeringPresence = {
  id: "01a0657d-023f-7edc-a7a6-92dff31aebf6",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "lingering-presence",
  title: "Lingering Presence",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
