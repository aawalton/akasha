import type { Module } from "../../code-system/module/module.page-type.ts"

export const bodyText = {
  id: "01a04fa7-aae4-77e8-8e0c-b9e61046b33b",
  pageTypeSlug: "module",
  slug: "body-text",
  definition: "a file body as the text it holds",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One decoder stands for every body read through here.",
    },
    {
      invariantKind: "departure",
      statement: "A path standing at nothing says nothing rather than empty text.",
    },
    {
      invariantKind: "constraint",
      statement: "Bytes that are not text read as the replacement character rather than refusing.",
    },
    {
      invariantKind: "constraint",
      statement: "A caller that must refuse them reaches for a decoder that is fatal.",
    },
    {
      invariantKind: "constraint",
      statement: "That gate is not here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows what the text means or which file it came from.",
    },
  ],
} as const satisfies Module
