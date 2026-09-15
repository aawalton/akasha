import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatConditionsReading = {
  id: "01a069bd-bdc5-709f-ba6f-cf8c3abe15bb",
  type: "module",
  slug: "seat-conditions-reading",
  definition: "what a seat runs under, read off the one seat-conditions page as text and flags",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An index part way through a refresh leaves the conditions unread rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "A wait on such an index is said once as it opens rather than on every ask.",
    },
    {
      invariantKind: "departure",
      statement: "A wait running past its ceiling says it gave up and refuses the read.",
    },
    {
      invariantKind: "departure",
      statement: "That refusal names the refresh rather than the conditions being unstated.",
    },
    {
      invariantKind: "departure",
      statement: "A throw that is no refresh reaches whoever asked without waiting.",
    },
  ],
} as const satisfies Module
