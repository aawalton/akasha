import type { Question } from "../question.page-type.ts"

export const node03SRebootForTheUinputApply15805HasADocumented = {
  id: "019f94e9-d135-7b84-9989-2c1471b60115",
  pageTypeSlug: "question",
  slug: "node-03-s-reboot-for-the-uinput-apply-15805-has-a-documented",
  ask: "node-03's reboot for the uinput apply (#15805) has a documented dark-hang risk that only a physical power-cycle recovers. Hold until you can babysit it, or proceed now accepting the risk?",
  askedBy: "aranya",
  askedIn: "019f8b5b-53e0-7a96-b52d-d119f6e5540e",
  status: "answered",
  offered: [
    "Hold until I'm available to babysit the reboot",
    "Proceed now — I accept the dark-node risk",
    "There's remote power control for node-03 — I'll point you to it",
  ],
  answer: "Proceed now — I accept the dark-node risk",
  closedAt: "2026-07-24T16:16:38.858Z",
  context: "txt",
} as const satisfies Question
