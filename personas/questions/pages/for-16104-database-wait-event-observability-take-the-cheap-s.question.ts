import type { Question } from "../question.page-type.ts"

export const for16104DatabaseWaitEventObservabilityTakeTheCheapS = {
  id: "019f9b3b-d295-7317-b4d2-749899c2ffdd",
  pageTypeSlug: "question",
  slug: "for-16104-database-wait-event-observability-take-the-cheap-s",
  ask: "For #16104 (database wait-event observability): take the cheap sampled instrument now, or the correct one that needs a Postgres primary restart?",
  askedBy: "aine",
  askedIn: "019f93a6-67c0-7174-a75d-40ae007e92e4",
  status: "answered",
  offered: [
    "A — cheap sampled now",
    "B — pg_wait_sampling, accept the restart",
    "A now, B later only if sampling proves too coarse",
  ],
  answer: "A now, B later only if sampling proves too coarse",
  closedAt: "2026-07-25T21:44:01.495Z",
  context: "txt",
} as const satisfies Question
