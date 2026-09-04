import type { Question } from "../question.page-type.ts"

export const rcCheckAgainDoesEchoShowConnectedOrDisconnectedInY = {
  id: "019f7566-b6c2-7ad4-b7b2-42b76de50599",
  pageTypeSlug: "question",
  slug: "rc-check-again-does-echo-show-connected-or-disconnected-in-y",
  ask: "RC check again: does echo show CONNECTED or disconnected in your app?",
  askedBy: "athena",
  askedIn: "019f3c82-e54b-7d9f-a0a0-b4d376196141",
  status: "answered",
  offered: ["Connected — clear it", "Disconnected — restart her"],
  answer: "Disconnected — restart her",
  closedAt: "2026-07-18T13:33:39.134Z",
  context: "txt",
} as const satisfies Question
