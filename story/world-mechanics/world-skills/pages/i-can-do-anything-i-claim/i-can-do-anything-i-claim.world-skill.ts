import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const iCanDoAnythingIClaim = {
  id: "01a06575-981b-7e45-8cf3-ba01a05873db",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "i-can-do-anything-i-claim",
  title: "I Can Do Anything I Claim",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
