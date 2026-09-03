import type { Question } from "../question.page-type.ts"

export const temperSFirstUserDoYouHaveASpecificPersonInMindOr = {
  id: "019f95e6-89fe-7743-accd-4518b23a5691",
  pageTypeSlug: "question",
  slug: "temper-s-first-user-do-you-have-a-specific-person-in-mind-or",
  ask: "Temper's first user — do you have a specific person in mind, or is it a generic friendly early-adopter (whoever shows up first)?",
  askedBy: "aine",
  askedIn: "019f93a6-67c0-7174-a75d-40ae007e92e4",
  status: "answered",
  offered: [
    "Generic — whoever shows up first (Ember's default stands)",
    "Specific person — I'll name them",
  ],
  answer: "Yeah, David Eggertsen will likely be first, with Joseph Walton as a likely second.",
  closedAt: "2026-07-24T20:54:29.345Z",
  context: "txt",
} as const satisfies Question
