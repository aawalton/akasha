import type { Question } from "../question.page-type.ts"

export const row16320VerificationDidThisNotificationArriveReadableWit = {
  id: "019fa4f5-4594-71f4-aec1-3cba0430c3dc",
  pageTypeSlug: "question",
  slug: "row-16320-verification-did-this-notification-arrive-readable-wit",
  ask: "#16320 verification: did this notification arrive readable, with the shell syntax below intact as literal text?",
  askedBy: "athena",
  askedIn: "019f9d68-65b6-7dd3-a6ed-77f8b0d9b6e4",
  status: "answered",
  offered: [
    "Clean — syntax literal, and I could answer from the notification alone",
    "Syntax literal, but I had to open the chat to make sense of it",
    "Something in the shell syntax vanished, executed, or arrived mangled",
  ],
  answer: "Clean — syntax literal, and I could answer from the notification alone",
  closedAt: "2026-07-27T19:03:15.478Z",
  context: "txt",
} as const satisfies Question
