import type { Question } from "../question.page-type.ts"

export const temperTellsTheUserFourTimesThatAProblemIsWorthRep = {
  id: "019f98d4-34d1-7e68-a20a-4467fcf1d836",
  pageTypeSlug: "question",
  slug: "temper-tells-the-user-four-times-that-a-problem-is-worth-rep",
  ask: "Temper tells the user four times that a problem is 'worth reporting' — but there is no contact, support or feedback route anywhere in the app. Where should David's reports actually go?",
  askedBy: "ember",
  askedIn: "019f32f0-ea53-7940-9596-1613e218bb1f",
  status: "answered",
  offered: [
    "Your personal email as a mailto: link",
    "In-app form that files a row straight to the backlog",
    "A channel you name (Discord/other) — tell me which",
    "No contact route — drop the 'worth reporting' phrasing instead",
  ],
  answer: "No contact route, we'll address deliberately designed contact flows separately later",
  closedAt: "2026-07-25T10:32:17.361Z",
  context: "txt",
} as const satisfies Question
