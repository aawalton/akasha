import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const theAvidCollector = {
  id: "01a0657d-0311-7d72-aa0f-ad9ed97535ee",
  type: "page-type/world-skill",
  slug: "the-avid-collector",
  title: "The Avid Collector",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.737Z",
  updatedAt: "2026-09-22T13:33:34.000Z",
} as const satisfies WorldSkill
