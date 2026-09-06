import type { Question } from "../question.page-type.ts"

export const theThreePanelsNowHaveTheAlwaysVisibleFilterBarYou = {
  id: "01a0068c-b803-7982-9c91-9ba14276442c",
  pageTypeSlug: "question",
  slug: "the-three-panels-now-have-the-always-visible-filter-bar-you",
  ask: "The three panels now have the always-visible filter bar you asked for. It only searches what the tree has already fetched, so on Domains it reports 'No results found' for a word matching a dozen domains until you press Expand All. Should I build extension-side filtering so it searches the whole corpus, or ship the bar as it stands?",
  askedBy: "amy",
  askedIn: "019fe60d-9158-73ef-9553-999949029d11",
  status: "answered",
  offered: [
    "Build extension-side filtering so it searches everything",
    "Ship the bar as it stands, searching only what is expanded",
  ],
  answer: "Okay, extension-side sounds right",
  closedAt: "2026-08-15T18:07:54.485Z",
  context: "txt",
} as const satisfies Question
