import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const literalSplicing = {
  id: "01a0822c-932a-7f1c-8dbf-5fe8221d3854",
  pageTypeSlug: "module",
  type: "module",
  slug: "literal-splicing",
  definition: "the span an edit takes in an object literal or an array literal",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A value put into a list holding no value falls just inside the bracket.",
    },
    {
      invariantKind: "departure",
      statement: "A value put into a list already holding values falls after the last value.",
    },
    {
      invariantKind: "departure",
      statement: "A value written after another value is written behind a comma and a space.",
    },
    {
      invariantKind: "departure",
      statement: "A value is written as the caller spells that value.",
    },
    {
      invariantKind: "departure",
      statement:
        "An entry put into an object holding no entry falls just inside the brace on its own line.",
    },
    {
      invariantKind: "departure",
      statement: "An entry put into an object falls after the entry `after` names.",
    },
    {
      invariantKind: "departure",
      statement: "An entry falls after the last entry where `after` names no entry.",
    },
    {
      invariantKind: "departure",
      statement: "An entry written after another takes the indent that entry has.",
    },
    {
      invariantKind: "departure",
      statement:
        "The one entry a literal has goes with everything between that literal's delimiters.",
    },
    {
      invariantKind: "departure",
      statement:
        "An entry followed by a comma goes with that comma and with the space before the entry.",
    },
    {
      invariantKind: "departure",
      statement:
        "An entry followed by no comma goes back to where the entry before that entry ended.",
    },
    {
      invariantKind: "departure",
      statement: "An index naming no entry answers a span with nothing.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the disk or the index.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here rewrites a body.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges whether an edit is wanted.",
    },
  ],
} as const satisfies Module
