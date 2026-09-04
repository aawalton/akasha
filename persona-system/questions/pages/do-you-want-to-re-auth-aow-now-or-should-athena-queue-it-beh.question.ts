import type { Question } from "../question.page-type.ts"

export const doYouWantToReAuthAowNowOrShouldAthenaQueueItBeh = {
  id: "019f996a-fbb5-75f5-bf44-8f6e1cbcbc72",
  pageTypeSlug: "question",
  slug: "do-you-want-to-re-auth-aow-now-or-should-athena-queue-it-beh",
  ask: "Do you want to re-auth aow now, or should Athena queue it behind the structural fix?",
  askedBy: "amy",
  askedIn: "019f82e2-489c-7736-8d45-8365713763ff",
  status: "answered",
  offered: [
    "Re-auth aow now",
    "Queue it behind the structural fix",
    "Leave it, I will decide later",
  ],
  answer: "Re-auth aow now",
  closedAt: "2026-07-25T13:16:04.360Z",
  context: "txt",
} as const satisfies Question
