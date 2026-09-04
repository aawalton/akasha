import type { Question } from "../question.page-type.ts"

export const shouldInteractiveAgentsTrialDownshiftingFromFable5To = {
  id: "019f95c9-8ce2-7318-865b-f66561ef8d17",
  pageTypeSlug: "question",
  slug: "should-interactive-agents-trial-downshifting-from-fable-5-to",
  ask: "Should interactive agents trial downshifting from Fable 5 to Opus 5 as the default interactive tier?",
  askedBy: "dalla",
  askedIn: "019f8b5b-33ff-79c7-a6a8-cbbc351eecc6",
  status: "answered",
  offered: [
    "Trial Opus 5 on interactive now — reversible, ~50% cost cut on the highest-burning tier, near-Fable quality (and beats Fable on OSWorld)",
    "Stay on Fable 5 for interactive — protect foreground quality/feel, no change",
    "Defer — run a side-by-side foreground-quality check first, then decide",
  ],
  answer:
    "Yeah, I already switched the default from Fable to Opus 4.8, I'd like to switch to Opus 5 across all cases.",
  closedAt: "2026-07-24T20:29:49.585Z",
  context: "txt",
} as const satisfies Question
