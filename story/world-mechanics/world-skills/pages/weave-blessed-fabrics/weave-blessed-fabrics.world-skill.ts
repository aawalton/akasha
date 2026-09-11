import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const weaveBlessedFabrics = {
  id: "01a0657d-032d-7699-9dae-2b2d5a9e5a35",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "weave-blessed-fabrics",
  title: "Weave Blessed Fabrics",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
