import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const superSupportiveDiagnosis = {
  id: "01a0e9f6-d517-7189-9d67-fbf0d4d9abc0",
  type: "page-type/world-skill",
  slug: "super-supportive-diagnosis",
  title: "Diagnosis",
  world: "world/super-supportive",
  description: "A Healer skill.",
} as const satisfies WorldSkill
