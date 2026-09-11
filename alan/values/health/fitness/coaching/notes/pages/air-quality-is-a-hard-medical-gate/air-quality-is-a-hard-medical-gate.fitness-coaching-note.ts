import type { FitnessCoachingNote } from "akasha/alan/values/health/fitness/coaching/notes/fitness-coaching-note.page-type.types.ts"

export const airQualityIsAHardMedicalGate = {
  id: "019f01e1-b79a-7960-8157-e7ef3d0f8f89",
  type: "fitness-coaching-note",
  slug: "air-quality-is-a-hard-medical-gate",
  title: "Air quality is a hard medical gate",
  active: true,
  focusTags: ["all"],
  kind: "medical-gate",
  sortOrder: 5,
  says: "txt",
} as const satisfies FitnessCoachingNote
