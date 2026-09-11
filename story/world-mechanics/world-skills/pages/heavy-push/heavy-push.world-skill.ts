import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const heavyPush = {
  id: "01a06575-9819-7318-b80c-c737fab3fd6c",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "heavy-push",
  title: "Heavy Push",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
