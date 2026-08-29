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
      statement:
        "One decoder stands for every body read through here, so a body reads the same wherever it is read and no caller carries a decoder of its own.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path standing at nothing says nothing, never empty text, because a body that is not there and a body holding nothing are different answers.",
    },
    {
      invariantKind: "constraint",
      statement:
        "Bytes that are not text read as the replacement character rather than refusing. A caller that must refuse them reaches for a decoder that is fatal, and that gate is not here.",
    },
    {
      invariantKind: "absence",
      statement:
        "Nothing here knows what the text means or which file it came from, so a page, a check and a commit all read a body the same way.",
    },
  ],
} as const satisfies Module
