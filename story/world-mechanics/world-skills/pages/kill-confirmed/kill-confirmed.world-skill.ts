import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const killConfirmed = {
  id: "01a06575-9821-7a2f-9018-09c1ce3f53c4",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "kill-confirmed",
  title: "Kill Confirmed",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
