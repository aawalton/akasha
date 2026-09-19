import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const massSign = {
  id: "01a0657d-024b-7619-9a50-bc758541b1dd",
  type: "page-type/world-skill",
  slug: "mass-sign",
  title: "Mass Sign",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
