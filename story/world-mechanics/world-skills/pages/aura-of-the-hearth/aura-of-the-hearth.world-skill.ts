import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const auraOfTheHearth = {
  id: "01a06575-97f0-70bb-9669-3974e25adef1",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "aura-of-the-hearth",
  title: "Aura of the Hearth",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
