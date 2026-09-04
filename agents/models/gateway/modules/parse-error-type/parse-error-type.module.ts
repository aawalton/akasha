import type { Module } from "@akasha/code-system/module"

export const parseErrorType = {
  id: "01a0628b-a005-77f9-a9c0-60f27c33f62a",
  pageTypeSlug: "module",
  slug: "parse-error-type",
  definition: "the type an error response body names under the body's `error` key",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An empty body text reads as no error type.",
    },
    {
      invariantKind: "departure",
      statement: "A body text that is no JSON reads as no error type.",
    },
    {
      invariantKind: "departure",
      statement: "An error type is read at `error.type` and nowhere else.",
    },
    {
      invariantKind: "departure",
      statement: "A non-string value at `error.type` reads as no error type.",
    },
    {
      invariantKind: "departure",
      statement: "An empty string at `error.type` is returned as an empty string.",
    },
    {
      invariantKind: "departure",
      statement: "A body key beside `error` never refuses the parse.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here throws.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here tells an unparseable body from a body naming no error type.",
    },
    {
      invariantKind: "gap",
      statement: "An `error` key present only on `Object.prototype` reads as absent.",
    },
  ],
} as const satisfies Module
