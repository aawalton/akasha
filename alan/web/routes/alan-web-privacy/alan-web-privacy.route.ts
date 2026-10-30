import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebPrivacy = {
  id: "01a08828-b1a2-7d99-a146-98a87aae6df0",
  type: "page-type/route",
  slug: "alan-web-privacy",
  definition: "how Amy keeps the phone numbers and the text messages of the people Amy writes to",
  code: "tsx",
  urlPath: "privacy",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The page carries verbatim the sentence a carrier requires on mobile information.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page names every field the opt-in form writes into a consent page.",
    },
  ],
  createdAt: "2026-09-09T21:52:43.426Z",
  updatedAt: "2026-10-30T17:01:21.575Z",
} as const satisfies Route
