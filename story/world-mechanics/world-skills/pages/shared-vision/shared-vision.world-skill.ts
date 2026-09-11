import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const sharedVision = {
  id: "01a0657d-02bf-745b-a66a-c87a9c3977c6",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "shared-vision",
  title: "Shared Vision",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
