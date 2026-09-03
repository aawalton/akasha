import type { Exercise } from "../../exercise.page-type.ts"

export const returnPushFromStance = {
  id: "019ebc77-cb10-7824-8208-6a207d1779c6",
  pageTypeSlug: "exercise",
  slug: "return-push-from-stance",
  title: "Return Push from Stance",
  exerciseCategory: "plyometrics",
  equipment: "medicine-ball",
  exerciseExternalId: "Return_Push_from_Stance",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Return_Push_from_Stance",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Return_Push_from_Stance/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Return_Push_from_Stance/0.jpg",
  implementCount: 1,
  isBallistic: true,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "v-push",
  muscleFocus: "push",
  primaryMuscles: ["shoulders"],
  scoringMode: "reps",
  secondaryMuscles: ["chest", "triceps"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
