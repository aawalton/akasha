import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const offenseMode = {
  id: "01a0657d-027b-7f0b-8e79-325bd3e282db",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "offense-mode",
  title: "Offense Mode",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
