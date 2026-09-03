import type { Question } from "../question.page-type.ts"

export const whenAnAgentSendsYouSomethingDoesItActuallyReachYou = {
  id: "019faba4-0b50-7b2b-b634-06e015c274ec",
  pageTypeSlug: "question",
  slug: "when-an-agent-sends-you-something-does-it-actually-reach-you",
  ask: "When an agent sends you something, does it actually reach your device?",
  askedBy: "athena",
  askedIn: "019f9d68-65b6-7dd3-a6ed-77f8b0d9b6e4",
  status: "answered",
  offered: [
    "All three reach me fine",
    "Some reach me, not all — I'll say which",
    "None of them reach me",
    "Can't tell right now — ask me again later",
  ],
  answer: "None of them reach me",
  closedAt: "2026-07-29T02:17:12.225Z",
  context: "txt",
} as const satisfies Question
