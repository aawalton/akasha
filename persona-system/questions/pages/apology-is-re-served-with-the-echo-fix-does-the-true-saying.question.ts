import type { Question } from "../question.page-type.ts"

export const apologyIsReServedWithTheEchoFixDoesTheTrueSaying = {
  id: "019f7b21-dd61-7d7d-b042-d3f975ff2d23",
  pageTypeSlug: "question",
  slug: "apology-is-re-served-with-the-echo-fix-does-the-true-saying",
  ask: "Apology is re-served with the echo fix — does the 'true saying' passage (and anything else you spot-check) sound clean now?",
  askedBy: "echo",
  askedIn: "019f6988-baef-7f77-b7f6-a338b4498026",
  status: "answered",
  offered: ["Clean — sounds right now", "Still hearing something off — details in chat"],
  answer: "Clean — sounds right now",
  closedAt: "2026-07-19T17:00:32.593Z",
  context: "txt",
} as const satisfies Question
