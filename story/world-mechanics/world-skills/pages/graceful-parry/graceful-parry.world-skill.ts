import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const gracefulParry = {
  id: "01a06575-9816-745b-b19c-4e57bf122baf",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "graceful-parry",
  title: "Graceful Parry",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
