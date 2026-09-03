import type { Question } from "../question.page-type.ts"

export const project19419HasALiveBreakTheCiPreparationStepPrepa = {
  id: "01a017fc-c557-7f8c-9d77-25d5c7c68492",
  pageTypeSlug: "question",
  slug: "project-19419-has-a-live-break-the-ci-preparation-step-prepa",
  ask: "project-19419 has a live break: the CI preparation step 'preparation-synth-k8s' runs 'bun ops k8s synth --write', but nothing populates the instructions tree it needs any more. Restore the instructions-tree acquisition, or stop that step using ops?",
  askedBy: "dalla",
  askedIn: "01a002da-6490-7827-9258-0c68ed3a901c",
  status: "dismissed",
  offered: ["restore instructions acquisition", "stop the step using ops"],
  closedAt: "2026-08-19T03:51:37.878Z",
  context: "txt",
} as const satisfies Question
