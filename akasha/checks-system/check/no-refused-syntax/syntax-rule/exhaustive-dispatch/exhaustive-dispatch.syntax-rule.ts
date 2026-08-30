import type { SyntaxRule } from "../syntax-rule.page-type.ts"

export const exhaustiveDispatch = {
  id: "01a0500d-738b-7aae-bdba-1ae379c7361e",
  pageTypeSlug: "syntax-rule",
  slug: "exhaustive-dispatch",
  definition: "the rule refusing a switch naming no default, or one its default falls out of",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A switch naming no default is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A default is right where it throws, returns, or calls `assertNever`, each of which ends the dispatch rather than falling out of it.",
    },
    {
      invariantKind: "departure",
      statement: "A default is read for what its statements do and never for what it says.",
    },
    {
      invariantKind: "departure",
      statement: "A switch nested inside another statement is a switch.",
    },
    {
      invariantKind: "departure",
      statement: "A test file is judged as any other.",
    },
    {
      invariantKind: "absence",
      statement:
        "Nothing here says the cases cover the type. What is refused is a switch that could fall out, not one that is short a case.",
    },
    {
      invariantKind: "gap",
      statement: "A default ending in a call to something that never returns is refused.",
    },
    {
      invariantKind: "gap",
      statement: "Only `assertNever` is known by name here.",
    },
  ],
} as const satisfies SyntaxRule
