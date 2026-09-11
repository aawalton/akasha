import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const sharedTrip = {
  id: "01a0657d-02bf-72e9-940b-c697b4cb79fc",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "shared-trip",
  title: "Shared Trip",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
