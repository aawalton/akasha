import type { SyntaxRule } from "../syntax-rule.page-type.ts"

export const noAkashaCommandFromCode = {
  id: "01a05a75-206d-71dc-87f5-7b633a8f8658",
  pageTypeSlug: "syntax-rule",
  type: "syntax-rule",
  slug: "no-akasha-command-from-code",
  definition: "the rule refusing a call that runs the akasha command from inside akasha",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The command's own name is refused in the program's place alone.",
    },
    {
      invariantKind: "absence",
      statement: "No path a launching call names is read, so no folder is spelled here.",
    },
    {
      invariantKind: "departure",
      statement: "A name bound to a literal at the top of the file is read as that literal.",
    },
    {
      invariantKind: "departure",
      statement: "A path built by joining is read through to the literals the path joins.",
    },
    {
      invariantKind: "departure",
      statement: "A string shown to a reader is not a call.",
    },
    {
      invariantKind: "departure",
      statement: "A test file is judged as every other file is judged.",
    },
    {
      invariantKind: "departure",
      statement:
        "A process a program starts to outlive its caller is not the call this rule refuses.",
    },
    {
      invariantKind: "absence",
      statement: "No use of the command from code is kept as permitted.",
    },
    {
      invariantKind: "gap",
      statement: "A name built as the code runs is not seen.",
    },
  ],
} as const satisfies SyntaxRule
