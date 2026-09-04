import type { Question } from "../question.page-type.ts"

export const shallICutATestflightBuildItShipsMainToYourDailyD = {
  id: "019faa04-2a5e-773e-b1e9-9601b433a116",
  pageTypeSlug: "question",
  slug: "shall-i-cut-a-testflight-build-it-ships-main-to-your-daily-d",
  ask: "Shall I cut a TestFlight build? It ships main to your daily-driver phone, and it is owed anyway.",
  askedBy: "amy",
  askedIn: "019fa96c-7ced-74b9-97ad-b8dd96fdf1c3",
  status: "answered",
  offered: [
    "Cut it — ship the owed TestFlight build now",
    "Wait for me — I'll tether the phone when I'm back",
    "Hold the baseline entirely until I've looked at what's in main",
  ],
  answer: "Cut it — ship the owed TestFlight build now",
  closedAt: "2026-07-28T18:41:34.830Z",
  context: "txt",
} as const satisfies Question
