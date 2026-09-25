import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const peekResponse = {
  id: "01a0629f-9062-7000-b86c-849d04fd83c0",
  type: "page-type/module",
  slug: "peek-response",
  definition: "a response read to text with a replacement response left in place",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A body is read to text once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The text read is kept for a caller to look at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body that cannot be read is taken as an empty body.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here tells an unreadable body from an empty body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The error type is parsed from the text read.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing a body can hold makes the error type parse throw.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Reading a response never throws.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A response to hand on is built only when a caller asks for a response.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each ask builds a response of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rebuilt response has the status of the original.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rebuilt response has the status text of the original.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rebuilt response has the headers of the original.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rebuilt response has a headers object of its own.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No decision here is made from the status.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rebuilt response has no content-encoding or content-length of the original.",
    },
  ],
} as const satisfies Module
