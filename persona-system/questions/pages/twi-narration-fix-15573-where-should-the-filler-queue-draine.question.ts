import type { Question } from "../question.page-type.ts"

export const twiNarrationFix15573WhereShouldTheFillerQueueDraine = {
  id: "019f6991-0ab1-77f6-8b93-c7f73a5a7369",
  pageTypeSlug: "question",
  slug: "twi-narration-fix-15573-where-should-the-filler-queue-draine",
  ask: "TWI narration fix (#15573): where should the filler-queue drainer live?",
  askedBy: "echo",
  askedIn: "019f6988-baef-7f77-b7f6-a338b4498026",
  status: "answered",
  offered: [
    "a: dedicated drain daemon (my lean)",
    "b: designated headless seats drain",
    "c: MacBook-side drainer",
    "your call is different — tell me",
  ],
  closedAt: "2026-07-16T06:18:56.522Z",
  context: "txt",
} as const satisfies Question
