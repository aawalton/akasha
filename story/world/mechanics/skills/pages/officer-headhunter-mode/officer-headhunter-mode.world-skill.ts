import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const officerHeadhunterMode = {
  id: "01a0657d-027b-767a-a01e-c09b228f4bab",
  type: "page-type/world-skill",
  slug: "officer-headhunter-mode",
  title: "Officer Headhunter Mode",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
