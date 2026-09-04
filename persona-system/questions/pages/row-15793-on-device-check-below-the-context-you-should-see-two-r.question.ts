import type { Question } from "../question.page-type.ts"

export const row15793OnDeviceCheckBelowTheContextYouShouldSeeTwoR = {
  id: "019f95f9-0b0b-759f-a402-aaa2991e731b",
  pageTypeSlug: "question",
  slug: "row-15793-on-device-check-below-the-context-you-should-see-two-r",
  ask: "15793 on-device check: below the context you should see two review-link cards — a 'Web ↗' card and a 'Native →' card. Does the web card open its URL in a browser, does the native card route IN-APP when you tap it here in the shell, and does this answer box stay above the fold (the review cards must not push it out of reach)?",
  askedBy: "athena",
  askedIn: "019f82df-de24-732c-9b7d-1d53ed2c2607",
  status: "answered",
  offered: [
    "all four pass",
    "native tap doesn't route in-app",
    "answer box pushed below the fold",
    "a card doesn't render / wrong badge",
  ],
  answer: "native tap doesn't route in-app",
  closedAt: "2026-07-24T21:14:35.684Z",
  context: "txt",
  links: [
    {
      label: "Open on web",
      target: "https://alanwalton.com",
      platform: "web",
    },
    {
      label: "Open in-app",
      target: "/",
      platform: "native",
    },
  ],
} as const satisfies Question
