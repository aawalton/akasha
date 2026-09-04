import type { Question } from "../question.page-type.ts"

export const intakeQuestionOneOfFiveNotifyPunchByTextMessageWha = {
  id: "019f6923-fca9-72ab-9e55-bec8aca9c731",
  pageTypeSlug: "question",
  slug: "intake-question-one-of-five-notify-punch-by-text-message-wha",
  ask: "Intake, question one of five: 'notify/punch by text message' — what did you mean? Which direction does the text go?",
  askedBy: "atlas",
  askedIn: "019f6920-9259-746c-843c-46dea4ed1985",
  status: "dismissed",
  offered: [
    "Punch a deal by sending a text (e.g. text the deal, it marks usesUsed)",
    "Get texted when I'm near an unpunched deal",
    "Both directions",
  ],
  closedAt: "2026-07-16T05:43:35.513Z",
  context: "txt",
} as const satisfies Question
