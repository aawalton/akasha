import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const quickenedScribing = {
  id: "01a0657d-029b-7b5d-8038-09cb5fb9cdb3",
  type: "page-type/world-skill",
  slug: "quickened-scribing",
  title: "Quickened Scribing",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
