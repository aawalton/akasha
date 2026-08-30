import type { Module } from "../../code-system/module/module.page-type.ts"

export const valueMinting = {
  id: "01a0503f-14ea-79f4-94bd-4c365bc24d5b",
  pageTypeSlug: "module",
  slug: "value-minting",
  definition: "the values a page being created does not carry, worked out and put into its body",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A value is worked out only for a page being created, so a page already standing keeps the value it was given.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body carried from another path is left alone, because a move carries what a page already is rather than making a second one.",
    },
    {
      invariantKind: "departure",
      statement:
        "A property the page already states is left alone, so a value written by hand is never overwritten.",
    },
    {
      invariantKind: "departure",
      statement:
        "Only a value worked out before the checks is put in here, the rest waiting until a commit is certain.",
    },
    {
      invariantKind: "departure",
      statement:
        "A generator kind nothing here can work out is refused, so an unfilled property is never handed to the checks as if it were filled.",
    },
    {
      invariantKind: "departure",
      statement:
        "The value goes in first in the literal, so every page reads the same way down the page.",
    },
    {
      invariantKind: "departure",
      statement:
        "An index that will not answer works nothing out, the checks then refusing the page for the value it lacks, so a repository whose index is damaged is still one a caller can write to.",
    },
    {
      invariantKind: "gap",
      statement:
        "Whether the page type declares the property is not asked here, so a second early property would go into pages whose type declares none. The checks refuse those, and nothing lands.",
    },
    {
      invariantKind: "absence",
      statement:
        "Nothing here writes a file or reaches git. It answers the changes as they would stand with their values in.",
    },
  ],
} as const satisfies Module
