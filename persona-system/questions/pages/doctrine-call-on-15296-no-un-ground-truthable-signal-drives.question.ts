import type { Question } from "../question.page-type.ts"

export const doctrineCallOn15296NoUnGroundTruthableSignalDrives = {
  id: "019f6e4e-c9c9-7748-92c3-6c0140657829",
  pageTypeSlug: "question",
  slug: "doctrine-call-on-15296-no-un-ground-truthable-signal-drives",
  ask: "Doctrine call on #15296 (no un-ground-truthable signal drives auto-remediation): allow a NARROW boot-scoped exception — when a freshly-booted seat's RC edge count stays below floor past a ~90s settle window, fire a loud alert AND one automatic session-preserving restart (single-shot, latch-guarded)?",
  askedBy: "athena",
  askedIn: "019f3c82-e54b-7d9f-a0a0-b4d376196141",
  status: "answered",
  offered: ["Allow the bounded boot retry", "Alert-only, no auto-retry"],
  closedAt: "2026-07-17T04:21:43.850Z",
  context: "txt",
} as const satisfies Question
