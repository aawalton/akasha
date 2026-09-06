import type { Question } from "../question.page-type.ts"

export const howShouldTheFrameworkKnowHowReadyYouAreEachDayIt = {
  id: "019f9490-b8b2-73a3-8879-2c709b8fe895",
  pageTypeSlug: "question",
  slug: "how-should-the-framework-know-how-ready-you-are-each-day-it",
  ask: "How should the framework know how READY you are each day? It always respects the hard gates (bad air = no outdoor exertion, non-negotiable). Beyond that — should it INFER readiness from data it already has (sleep, recent training load), start each session by ASKING you a quick one-touch energy read, or BOTH? My lean: both — an objective floor from data + your one-word check-in, since your capacity swings (Safety 4-5, recently -2) and only you feel the low days.",
  askedBy: "aelwyn",
  askedIn: "019f2928-5b41-7b0e-98e2-03f4789d4b42",
  status: "answered",
  offered: [
    "Both — data floor + a quick daily energy check-in from me (my lean)",
    "Infer from data only — don't make me check in",
    "Ask me each session — my read drives it",
  ],
  answer: "Yeah, you should ask me and then should be able to feed that context into the engine.",
  closedAt: "2026-07-24T14:41:40.377Z",
  context: "txt",
} as const satisfies Question
