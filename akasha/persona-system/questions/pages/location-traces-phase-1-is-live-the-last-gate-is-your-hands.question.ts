import type { Question } from "../question.page-type.ts"

export const locationTracesPhase1IsLiveTheLastGateIsYourHands = {
  id: "019f69eb-0e25-71da-82e9-2c167b6ff91c",
  pageTypeSlug: "question",
  slug: "location-traces-phase-1-is-live-the-last-gate-is-your-hands",
  ask: "Location traces phase 1 is live — the last gate is your hands: cut the TestFlight build on the macbook, install on your iPhone, grant location ALWAYS, and take a walk. Tell me when traces land (or where it snagged).",
  askedBy: "atlas",
  askedIn: "019f6920-9259-746c-843c-46dea4ed1985",
  status: "answered",
  offered: [
    "Traces landing — walked and confirmed",
    "Snagged on the macbook/Xcode step",
    "Snagged Apple-side (ASC record / signing)",
  ],
  closedAt: "2026-07-16T07:56:23.832Z",
  context: "txt",
} as const satisfies Question
