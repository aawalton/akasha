import type { Question } from "../question.page-type.ts"

export const build132IsOnTestflightWithBothHalvesOfTheSessionF = {
  id: "019f6bdf-f9ba-7582-94c6-bf60cf2e7290",
  pageTypeSlug: "question",
  slug: "build-132-is-on-testflight-with-both-halves-of-the-session-f",
  ask: "Build 132 is on TestFlight with both halves of the session fix — update when convenient. Then just use the app normally: the real verification is that answering keeps working after the app sits backgrounded (the resume now re-arms token refresh), and if a session ever truly dies you should see an honest 'signed out' notice instead of 'didn't go through'. Reply here after a day or so of normal use.",
  askedBy: "athena",
  askedIn: "019f3c82-e54b-7d9f-a0a0-b4d376196141",
  status: "answered",
  offered: ["Working after resume — close it", "It recurred"],
  closedAt: "2026-07-16T17:43:35.639Z",
  context: "txt",
} as const satisfies Question
