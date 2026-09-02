import type { Module } from "../../code-system/modules/module.page-type.ts"

export const normalize = {
  id: "01a05b6f-999d-7245-878b-3293cdfb33fb",
  pageTypeSlug: "module",
  slug: "normalize",
  definition: "the words the channel shows for a message it carried or would not carry",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "A refusal notice carries no part of the message the notice refused.",
    },
    {
      invariantKind: "departure",
      statement: "A message with nothing but space in the message is shown as having no body.",
    },
    {
      invariantKind: "departure",
      statement: "The account a message acts for is written into the surface a seat reads.",
    },
    {
      invariantKind: "departure",
      statement: "A sender is lower-cased before the sender is matched.",
    },
  ],
} as const satisfies Module
