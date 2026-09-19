import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const suddenUpdraft = {
  id: "01a0657d-02fe-7778-bd3f-8e22ab6d02ca",
  type: "page-type/world-skill",
  slug: "sudden-updraft",
  title: "Sudden Updraft",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
