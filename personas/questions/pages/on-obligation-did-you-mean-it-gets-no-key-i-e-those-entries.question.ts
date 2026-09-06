import type { Question } from "../question.page-type.ts"

export const onObligationDidYouMeanItGetsNoKeyIEThoseEntries = {
  id: "019fc388-bd26-7d9c-9592-aa4d3d796d82",
  pageTypeSlug: "question",
  slug: "on-obligation-did-you-mean-it-gets-no-key-i-e-those-entries",
  ask: "On Obligation — did you mean it gets no key, i.e. those entries just use the existing # Tasks section and no new construct is minted?",
  askedBy: "vera",
  askedIn: "019fc2ad-6bf8-7b84-b0f8-95908d0df5c2",
  status: "dismissed",
  offered: [
    "Right — no key, existing section, as landed",
    "I want to revisit whether # Tasks should exist at all",
    "Revert it — those entries belong nowhere",
  ],
  closedAt: "2026-08-02T17:44:36.424Z",
  context: "txt",
} as const satisfies Question
