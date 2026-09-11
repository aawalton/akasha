import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const iOutrankYou = {
  id: "01a06575-981c-7105-9aac-60148e1baa8d",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "i-outrank-you",
  title: "I Outrank You",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
