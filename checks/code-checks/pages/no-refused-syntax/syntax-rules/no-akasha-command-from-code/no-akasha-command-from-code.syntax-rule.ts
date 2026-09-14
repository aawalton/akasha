import type { SyntaxRule } from "akasha/checks/code-checks/pages/no-refused-syntax/syntax-rules/syntax-rule.page-type.types.ts"

export const noAkashaCommandFromCode = {
  id: "01a05a75-206d-71dc-87f5-7b633a8f8658",
  type: "syntax-rule",
  slug: "no-akasha-command-from-code",
  definition: "the rule refusing a call that runs the akasha command from inside akasha",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The command's own name is refused in the program's place alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name the runner starts a process by is a launching call.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The program a runner is handed is the first word of the list that runner takes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A name is judged by what that name spells rather than by where it was taken from.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No path a launching call names is read.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No folder is spelled here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name bound to a literal at the top of the file is read as that literal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path built by joining is read through to the literals the path joins.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A string shown to a reader is not a call.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A test file is judged as every other file is judged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A process a program starts to outlive its caller is not the call this rule refuses.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No use of the command from code is kept as permitted.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A name built as the code runs is not seen.",
    },
  ],
} as const satisfies SyntaxRule
