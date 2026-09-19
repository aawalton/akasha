import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const threatAppraisal = {
  id: "01a0657d-0315-798f-9607-ff3f4d1d01dd",
  type: "page-type/world-skill",
  slug: "threat-appraisal",
  title: "Threat Appraisal",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
