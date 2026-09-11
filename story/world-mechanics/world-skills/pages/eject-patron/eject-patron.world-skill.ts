import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const ejectPatron = {
  id: "01a06575-9807-7fdf-b7ba-d59662e6d3ab",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "eject-patron",
  title: "Eject Patron",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
