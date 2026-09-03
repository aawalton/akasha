import type { Question } from "../question.page-type.ts"

export const forTheNewQuestionsInboxStoplight15781WhichCountcolor = {
  id: "019f93e1-e1c2-73be-aaa8-c5d21fce21f9",
  pageTypeSlug: "question",
  slug: "for-the-new-questions-inbox-stoplight-15781-which-countcolor",
  ask: "For the new 'Questions' inbox stoplight (#15781), which count→color ladder do you want? Open questions rarely exceed single digits, so it needs its own thresholds rather than the inbox default.",
  askedBy: "athena",
  askedIn: "019f82df-de24-732c-9b7d-1d53ed2c2607",
  status: "answered",
  offered: [
    "0→blue, 1–2→yellow, 3+→red (my default)",
    "0→green, 1–2→yellow, 3+→red",
    "0→green, 1+→yellow, 3+→red (red only at 3+, yellow at first)",
    "0→blue, 1+→red (any open question = red)",
  ],
  answer: "0-blue 1-green 2-yellow 4+red",
  closedAt: "2026-07-24T11:33:55.192Z",
  context: "txt",
} as const satisfies Question
