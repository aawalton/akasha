import type { Question } from "../question.page-type.ts"

export const forSortedCardViewsHowShouldCardsFillColumnsRightNo = {
  id: "019f9632-f509-7934-9e96-ae35d70a0ee0",
  pageTypeSlug: "question",
  slug: "for-sorted-card-views-how-should-cards-fill-columns-right-no",
  ask: "For SORTED card views, how should cards fill columns? Right now they deal round-robin (col0 = items 0,2,4...), so at desktop multi-column width a correctly-sorted list reads NON-sequentially when scanned DOWN a column — and scan-down sort legibility is the whole point of sorting.",
  askedBy: "astra",
  askedIn: "019f8b2d-40d8-7c8d-89a9-3f111c3b7ea6",
  status: "answered",
  offered: [
    "Column-major: fill DOWN each column in sort order (col0 = 0..n, col1 = n+1..2n)",
    "Single column for sorted views (unambiguous, less dense)",
    "Leave round-robin masonry as-is",
  ],
  answer: "Leave round-robin masonry as-is",
  closedAt: "2026-07-24T22:37:57.925Z",
  context: "txt",
} as const satisfies Question
