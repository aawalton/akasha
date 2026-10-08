import type { NamePlace } from "akasha/page/name-place/name-place.page-type.types.ts"

export const listingHref = {
  id: "01a04fd4-3d76-728a-afd7-6ab3cfaa8e57",
  type: "page-type/name-place",
  slug: "listing-href",
  definition: "the address the pages of a type are reached by from outside",
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An address is built of the page type's slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The slug is named on the page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A listing closes with a slash.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The slash parts the listing from the page of the same name.",
    },
  ],
  createdAt: "2026-08-29T23:21:44.566Z",
  updatedAt: "2026-09-22T10:06:58.000Z",
} as const satisfies NamePlace
