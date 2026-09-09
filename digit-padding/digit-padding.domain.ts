import type { Domain } from "../domains/domain.page-type.ts"

export const digitPadding = {
  id: "01a05c8b-6039-77c9-8131-222d1705c4c3",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "digit-padding",
  definition: "how a number too short is filled out with leading zeros",
  parts: ["module/pad-two"],
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here knows the thing the number this package fills out counts.",
    },
    {
      invariantKind: "departure",
      statement: "The width counts every character a number is written with.",
    },
    {
      invariantKind: "departure",
      statement: "The width is a contract rather than a courtesy.",
    },
    {
      invariantKind: "departure",
      statement:
        "A shorter answer breaks a caller that parses back the answer this package writes.",
    },
  ],
} as const satisfies Domain
