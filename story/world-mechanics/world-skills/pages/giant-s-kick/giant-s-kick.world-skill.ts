import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const giantSKick = {
  id: "01a06575-9814-7065-81e4-0f54db041aa0",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "giant-s-kick",
  title: "Giant’s Kick",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
