import type { SyntaxRule } from "akasha/check/code/pages/no-refused-syntax/syntax-rule/syntax-rule.page-type.types.ts"

export const exhaustiveDispatch = {
  id: "01a0500d-738b-7aae-bdba-1ae379c7361e",
  type: "syntax-rule",
  slug: "exhaustive-dispatch",
  definition: "the rule refusing a switch naming no default, or one its default falls out of",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A default is right where the default throws.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A default is right where the default returns.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A default is right where the default calls `assertNever`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every such default ends the dispatch rather than falling out of that dispatch.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A default is read for the work its statements do and never for the words the default says.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A switch nested inside another statement is a switch.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here says the cases cover the type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A default ending in a call to something that never returns is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only `assertNever` is known by name here.",
    },
  ],
} as const satisfies SyntaxRule
