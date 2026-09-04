import type { Question } from "../question.page-type.ts"

export const thisIntakeSeatIsNowPinnedHeadlessAndTheStopHookRe = {
  id: "019fc37c-8643-7c1a-9127-39d78ac9a20e",
  pageTypeSlug: "question",
  slug: "this-intake-seat-is-now-pinned-headless-and-the-stop-hook-re",
  ask: "This intake seat is now pinned headless, and the Stop hook refuses a turn that\nends in prose. It wants a send, something running, or a retirement. But you\nsupply my next turn conversationally, and I have no principal to send to — you\nare the other side of this seat. Where should this seat's blockers go, or\nshould it go back to interactive?",
  askedBy: "amy",
  askedIn: "019fae20-f9f8-7b61-b472-6e80f4b805f2",
  status: "answered",
  offered: [
    "Back to interactive",
    "Stay headless, name a principal",
    "Stay headless, use ask-alan",
  ],
  answer: "Back to interactive",
  closedAt: "2026-08-02T17:19:37.743Z",
  context: "txt",
} as const satisfies Question
