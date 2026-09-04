import type { Question } from "../question.page-type.ts"

export const willYouSendABareTurnFromTheAppToAthenaSSessionA = {
  id: "019f4c5d-aa2d-7250-beab-68fb2490acb1",
  pageTypeSlug: "question",
  slug: "will-you-send-a-bare-turn-from-the-app-to-athena-s-session-a",
  ask: "Will you send a bare turn from the app to athena's session and then to aranya's session to test whether control commands reach these seats despite their rcConnections being 0?",
  askedBy: "athena",
  askedIn: "019f3c82-e54b-7d9f-a0a0-b4d376196141",
  status: "answered",
} as const satisfies Question
