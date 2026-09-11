import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const manaSense = {
  id: "01a0657d-0242-75f6-8056-80ac10493b75",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "mana-sense",
  title: "Mana Sense",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
