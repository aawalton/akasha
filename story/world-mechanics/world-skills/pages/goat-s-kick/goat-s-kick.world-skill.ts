import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const goatSKick = {
  id: "01a06575-9815-7d74-bfcc-a9ae6e3e29df",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "goat-s-kick",
  title: "Goat’s Kick",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
