import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const bladeArt = {
  id: "01a06575-97f5-72fa-893e-7e098766b8f1",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "blade-art",
  title: "Blade Art",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
