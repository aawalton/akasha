import type { Question } from "../question.page-type.ts"

export const mayISplitTasksInstructionsReviewMdBySubjectTheWay = {
  id: "019fbacb-36af-7251-859d-f7ad43953b8e",
  pageTypeSlug: "question",
  slug: "may-i-split-tasks-instructions-review-md-by-subject-the-way",
  ask: "May I split `tasks/instructions-review.md` by subject, the way the questions surfaces split, now that it is full and findings are being lost against its ceiling?",
  askedBy: "athena",
  askedIn: "019fba68-7d7f-7283-960d-10abb0f97555",
  status: "answered",
  offered: [
    "Yes — split it at the stage-2 / stage-3 seam",
    "Yes, but wait until the fleet is idle",
    "No — keep it one surface and displace instead",
    "Hold until I'm back",
  ],
  answer:
    "The task shouldn’t have been updated with findings, that’s should be reverted. You could create specialized tasks as needed for the project though and can relax the fix immediately constraint",
  closedAt: "2026-08-01T00:50:32.964Z",
  context: "txt",
} as const satisfies Question
