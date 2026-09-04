import type { Module } from "@akasha/code-system/module"

export const peekResponse = {
  id: "01a0629f-9062-7000-b86c-849d04fd83c0",
  pageTypeSlug: "module",
  slug: "peek-response",
  definition: "a response read to text with a replacement response left in place",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A body is read to text once.",
    },
    {
      invariantKind: "departure",
      statement: "The text read is kept for a caller to look at.",
    },
    {
      invariantKind: "departure",
      statement: "A body that cannot be read reads as an empty body.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here tells an unreadable body from an empty body.",
    },
    {
      invariantKind: "departure",
      statement: "The error type is parsed from the text read.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing a body can hold makes the error type parse throw.",
    },
    {
      invariantKind: "absence",
      statement: "Reading a response never throws.",
    },
    {
      invariantKind: "departure",
      statement: "A response to hand on is built only when a caller asks for one.",
    },
    {
      invariantKind: "departure",
      statement: "Each ask builds a response of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A rebuilt response carries the status of the original.",
    },
    {
      invariantKind: "departure",
      statement: "A rebuilt response carries the status text of the original.",
    },
    {
      invariantKind: "departure",
      statement: "A rebuilt response carries the headers of the original.",
    },
    {
      invariantKind: "departure",
      statement: "A rebuilt response holds a headers object of its own.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the status to decide what to do.",
    },
    {
      invariantKind: "gap",
      statement: "A rebuilt response carries the content-encoding of a body already decoded.",
    },
    {
      invariantKind: "gap",
      statement: "A rebuilt response carries the content-length of the compressed body.",
    },
  ],
} as const satisfies Module
