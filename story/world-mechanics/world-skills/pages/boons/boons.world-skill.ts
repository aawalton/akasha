import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const boons = {
  id: "01a06575-97f8-79e6-b149-e225a651f867",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "boons",
  title: "Boons",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
