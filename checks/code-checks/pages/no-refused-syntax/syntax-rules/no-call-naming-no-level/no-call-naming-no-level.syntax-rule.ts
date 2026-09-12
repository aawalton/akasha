import type { SyntaxRule } from "akasha/checks/code-checks/pages/no-refused-syntax/syntax-rules/syntax-rule.page-type.types.ts"

export const noCallNamingNoLevel = {
  id: "01a09578-4c2b-7000-9a41-6f5d3e8b71c0",
  type: "syntax-rule",
  slug: "no-call-naming-no-level",
  definition:
    "the rule refusing a call marked in a literal whose word under a namespace names no level there",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A call between backticks in a literal was marked as a call and is judged as one.",
    },
    {
      invariantKind: "departure",
      statement: "The first word after `akasha` names a level or nothing there is judged.",
    },
    {
      invariantKind: "departure",
      statement: "A word names a level where the level before it and that word join to a slug.",
    },
    {
      invariantKind: "departure",
      statement: "A word after a command is an argument rather than a level.",
    },
    {
      invariantKind: "departure",
      statement:
        "A word carrying anything but lowercase letters, digits and hyphens ends the read.",
    },
    {
      invariantKind: "departure",
      statement: "A call ending on a namespace is a listing rather than a fault.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal names the deepest level the call reached.",
    },
    {
      invariantKind: "departure",
      statement: "The line named is the line the literal is on.",
    },
    {
      invariantKind: "absence",
      statement: "A call spelled with no backticks around it is not judged.",
    },
    {
      invariantKind: "absence",
      statement: "A call whose first word names no level is not judged.",
    },
    {
      invariantKind: "absence",
      statement: "A level whose name is not its own slug is no first word here.",
    },
    {
      invariantKind: "absence",
      statement: "A call built as the code runs is not judged here.",
    },
    {
      invariantKind: "absence",
      statement: "A word this rule takes for an argument is not judged against the arguments.",
    },
  ],
} as const satisfies SyntaxRule
