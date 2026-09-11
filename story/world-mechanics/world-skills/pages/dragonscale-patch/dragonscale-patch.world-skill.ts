import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const dragonscalePatch = {
  id: "01a06575-9805-7c3f-b119-22a376250a78",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "dragonscale-patch",
  title: "Dragonscale Patch",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
