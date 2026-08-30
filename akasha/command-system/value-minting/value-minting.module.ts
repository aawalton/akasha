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
      invariantKind: "departure",
      statement:
        "A number is worked out once the checks have passed and before anything is written, so a refused change spends none.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page takes the number its own page type holds, and that count rises in the same commit, so no number stands as taken by nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page type holding no count hands out nothing, which is how a page type says it does not count.",
    },
    {
      invariantKind: "departure",
      statement:
        "Pages of one type take their numbers in the order of their paths, so one change lands the same numbers however it was written.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body worked on after the checks is formatted again, the formatter having last seen a body without the value in it.",
    },
    {
      invariantKind: "gap",
      statement:
        "Whether the page type declares the property is not asked here, so a second early property would go into pages whose type declares none. The checks refuse those, and nothing lands.",
    },
    {
      invariantKind: "gap",
      statement:
        "What lands after the checks pass is not quite what they judged. Only a number goes in, and the page type's count rises, neither of which any check would have spoken to.",
    },
    {
      invariantKind: "absence",
      statement:
        "Nothing here writes a file or reaches git. It answers the changes as they would stand with their values in.",
    },
  ],
} as const satisfies Module
