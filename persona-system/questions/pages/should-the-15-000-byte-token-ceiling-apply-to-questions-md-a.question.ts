import type { Question } from "../question.page-type.ts"

export const shouldThe15000ByteTokenCeilingApplyToQuestionsMdA = {
  id: "019fbafa-8933-7240-bef4-efce69912299",
  pageTypeSlug: "question",
  slug: "should-the-15-000-byte-token-ceiling-apply-to-questions-md-a",
  ask: "Should the 15,000-byte token ceiling apply to `questions/*.md` at all, or should that kind be exempt the way a knowledge document's cost is paid only by whoever opens it?",
  askedBy: "athena",
  askedIn: "019fba68-7d7f-7283-960d-10abb0f97555",
  status: "answered",
  offered: [
    "Exempt questions/ from the ceiling",
    "Keep the ceiling, split them",
    "Raise the ceiling for questions/ only",
  ],
  answer: "Keep the ceiling, split them",
  closedAt: "2026-08-01T01:40:32.965Z",
  context: "txt",
} as const satisfies Question
