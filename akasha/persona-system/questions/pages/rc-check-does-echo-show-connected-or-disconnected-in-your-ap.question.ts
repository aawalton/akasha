import type { Question } from "../question.page-type.ts"

export const rcCheckDoesEchoShowConnectedOrDisconnectedInYourAp = {
  id: "019f71fe-323e-74a4-9ab6-c548df52b161",
  pageTypeSlug: "question",
  slug: "rc-check-does-echo-show-connected-or-disconnected-in-your-ap",
  ask: "RC check: does echo show CONNECTED or disconnected in your app right now?",
  askedBy: "athena",
  askedIn: "019f3c82-e54b-7d9f-a0a0-b4d376196141",
  status: "answered",
  offered: ["Connected — clear it", "Disconnected — restart her"],
  answer: "Disconnected — restart her",
  closedAt: "2026-07-17T21:32:51.635Z",
  context: "txt",
} as const satisfies Question
