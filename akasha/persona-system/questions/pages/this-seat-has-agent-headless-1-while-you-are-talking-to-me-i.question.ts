import type { Question } from "../question.page-type.ts"

export const thisSeatHasAgentHeadless1WhileYouAreTalkingToMeI = {
  id: "019fa581-b119-7ecf-8d1e-a1e8d3c9a59f",
  pageTypeSlug: "question",
  slug: "this-seat-has-agent-headless-1-while-you-are-talking-to-me-i",
  ask: "This seat has AGENT_HEADLESS=1 while you are talking to me interactively. Is that intended for a persona seat booted via /lead, or did the harness rebuild mis-mark it?",
  askedBy: "dalla",
  askedIn: "019fa362-798b-7184-ad7a-abb3b331f403",
  status: "answered",
  offered: [
    "Intended — headless is correct for this seat",
    "Mis-marked by the rebuild — I'll fix it",
    "Not sure yet, leave it and carry on",
  ],
  answer:
    "You're not supposed to be up quite yet, I'm working through the full backlog for Athena first as we're stabilizing on the new agent harness.",
  closedAt: "2026-07-27T21:37:07.671Z",
  context: "txt",
} as const satisfies Question
