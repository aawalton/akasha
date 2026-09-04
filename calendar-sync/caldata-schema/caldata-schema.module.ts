import type { Module } from "../../code-system/modules/module.page-type.ts"

export const caldataSchema = {
  id: "01a05c22-7bc8-7000-aa11-74d2eaf3b06a",
  pageTypeSlug: "module",
  slug: "caldata-schema",
  definition: "the shape an event arrives in from a library's calendar feed",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A field the feed leaves out or sends as null is read as absent.",
    },
    {
      invariantKind: "departure",
      statement: "A field nobody here names is carried through rather than dropped.",
    },
    {
      invariantKind: "departure",
      statement: "Every value the feed sends is text.",
    },
  ],
} as const satisfies Module
