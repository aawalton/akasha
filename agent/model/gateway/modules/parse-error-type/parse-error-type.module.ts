import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const parseErrorType = {
  id: "01a0628b-a005-77f9-a9c0-60f27c33f62a",
  type: "page-type/module",
  slug: "parse-error-type",
  definition: "the type an error response body names under the body's `error` key",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty body text is taken as no error type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body text that is no JSON reads as no error type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An error type is read at `error.type` and nowhere else.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A non-string value at `error.type` reads as no error type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty string at `error.type` is returned as an empty string.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body key beside `error` never refuses the parse.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here throws.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here tells an unparseable body from a body naming no error type.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "An `error` key present only on `Object.prototype` is taken as absent.",
    },
  ],
} as const satisfies Module
