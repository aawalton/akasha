import type { Module } from "../../code-system/modules/module.page-type.ts"

export const caldataClient = {
  id: "01a05c22-7bc9-7001-9c7b-ecf577882eb2",
  pageTypeSlug: "module",
  slug: "caldata-client",
  definition: "every event a library's feed holds over a horizon, fetched a window at a time",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A window runs thirty days and the horizon a hundred and twenty unless the caller says otherwise.",
    },
    {
      invariantKind: "departure",
      statement: "An event met in two windows is kept once.",
    },
    {
      invariantKind: "departure",
      statement: "A window the feed refuses stops the fetch rather than leaving a gap unsaid.",
    },
  ],
} as const satisfies Module
