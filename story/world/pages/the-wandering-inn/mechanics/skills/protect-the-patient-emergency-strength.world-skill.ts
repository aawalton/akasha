import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const protectThePatientEmergencyStrength = {
  id: "01a0657d-0297-7951-a64f-b9e15a4d6e10",
  type: "page-type/world-skill",
  slug: "protect-the-patient-emergency-strength",
  title: "Protect the Patient: Emergency Strength",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
