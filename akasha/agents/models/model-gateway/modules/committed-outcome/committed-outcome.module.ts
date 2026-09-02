import type { Module } from "@akasha/code-system/module"

export const committedOutcome = {
  id: "01a0622f-4550-7f67-8307-16e48ffd8ea5",
  pageTypeSlug: "module",
  slug: "committed-outcome",
  definition: "what an already-committed response does with the status upstream finally returns",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A status from 200 to 299 is spliced through.",
    },
    {
      invariantKind: "departure",
      statement: "Every other status becomes an error frame.",
    },
    {
      invariantKind: "departure",
      statement: "A redirect is an error frame rather than a status to follow.",
    },
    {
      invariantKind: "departure",
      statement: "Status 503 and status 529 are named `overloaded_error`.",
    },
    {
      invariantKind: "departure",
      statement: "Every other status is named `api_error`.",
    },
    {
      invariantKind: "departure",
      statement: "The message names the status the message was made from.",
    },
    {
      invariantKind: "departure",
      statement: "A status that splices still gets an error name when an error name is asked for.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here builds the bytes of the frame this module names.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here sees more of a response than its status.",
    },
  ],
} as const satisfies Module
