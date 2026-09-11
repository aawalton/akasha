import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const constructVesselHuman = {
  id: "01a06575-97fd-739d-9262-30a28f4cff40",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "construct-vessel-human",
  title: "Construct Vessel: Human",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
