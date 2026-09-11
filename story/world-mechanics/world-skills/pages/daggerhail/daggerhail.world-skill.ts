import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const daggerhail = {
  id: "01a06575-9800-70cd-a1ab-6f0e69293bd5",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "daggerhail",
  title: "Daggerhail",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
