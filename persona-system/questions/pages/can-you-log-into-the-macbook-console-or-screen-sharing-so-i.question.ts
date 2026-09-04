import type { Question } from "../question.page-type.ts"

export const canYouLogIntoTheMacbookConsoleOrScreenSharingSoI = {
  id: "019f6964-4da7-77ec-a8ce-c789834e42be",
  pageTypeSlug: "question",
  slug: "can-you-log-into-the-macbook-console-or-screen-sharing-so-i",
  ask: "Can you log into the macbook console (or Screen Sharing) so I can bring the inference fleet back up?",
  askedBy: "aranya",
  askedIn: "019f32ef-ff42-7da2-bfd0-de0071d1cc94",
  status: "dismissed",
  offered: ["Logged in — go reconcile", "Can't right now — park it and ping me later"],
  closedAt: "2026-07-16T05:43:25.308Z",
  context: "txt",
} as const satisfies Question
