import type { Module } from "@akasha/code-system/module"

export const landingSaying = {
  id: "01a06d77-0d79-7f0a-8ea4-cb8531aeecfb",
  pageTypeSlug: "module",
  slug: "landing-saying",
  definition: "the report a landing answers with",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A report opens with what the caller asked to have said of the landing.",
    },
    {
      invariantKind: "departure",
      statement: "A report that could not be built names what the landing wrote and took away.",
    },
    {
      invariantKind: "departure",
      statement: "Why a report could not be built is said in the report.",
    },
    {
      invariantKind: "departure",
      statement: "A report says what became of the commit.",
    },
    {
      invariantKind: "departure",
      statement:
        "A commit that could not be named is told apart from a landing that committed nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A body that landed other than as it was handed in is named in the report.",
    },
    {
      invariantKind: "departure",
      statement: "A value worked out as a body landed is named in the report.",
    },
    {
      invariantKind: "departure",
      statement: "A landing that ran no check says why in place of the count.",
    },
    {
      invariantKind: "departure",
      statement: "What a draft left is named in the report as what was drafted.",
    },
    {
      invariantKind: "departure",
      statement: "Where a draft's patch is kept is named in the report.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a file.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges.",
    },
  ],
} as const satisfies Module
