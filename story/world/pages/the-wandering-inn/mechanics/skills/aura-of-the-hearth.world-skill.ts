import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const auraOfTheHearth = {
  id: "01a06575-97f0-70bb-9669-3974e25adef1",
  type: "page-type/world-skill",
  slug: "aura-of-the-hearth",
  title: "Aura of the Hearth",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
