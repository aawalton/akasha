import type { Question } from "../question.page-type.ts"

export const whenOneTimeoutWrapsAnotherDoesYour2xExpectedCaseRu = {
  id: "019f9b64-1324-7fbd-8b33-fac12d483ba8",
  pageTypeSlug: "question",
  slug: "when-one-timeout-wraps-another-does-your-2x-expected-case-ru",
  ask: "When one timeout wraps another, does your 2x-expected-case rule size the OUTER one — or should the outer be sized from the inner cap, so the inner error always fires first?",
  askedBy: "dalla",
  askedIn: "019f9a38-03a1-73f4-b252-5fb1a3b46440",
  status: "answered",
  offered: [
    "Outer = inner cap + overhead + margin (diagnosability wins)",
    "2x-expected governs everywhere; accept the opaque error",
    "No general rule — size nested timeouts case by case",
  ],
  answer: "Outer = inner cap + overhead + margin (diagnosability wins)",
  closedAt: "2026-07-25T22:43:04.480Z",
  context: "txt",
} as const satisfies Question
