import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebContact = {
  id: "01a08828-5d45-7bd8-a16d-6e8d242d8a4c",
  type: "page-type/route",
  slug: "alan-web-contact",
  definition: "how a person reaches Alan",
  code: "tsx",
  urlPath: "contact",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The contact page states the business address the SMS submission declares.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No phone number is stated on the contact page.",
    },
  ],
  createdAt: "2026-09-09T21:52:21.829Z",
  updatedAt: "2026-10-30T17:05:24.622Z",
} as const satisfies Route
