import type { SyntaxRule } from "../syntax-rule.page-type.ts"

export const noAkashaCommandFromCode = {
  id: "01a05a75-206d-71dc-87f5-7b633a8f8658",
  pageTypeSlug: "syntax-rule",
  slug: "no-akasha-command-from-code",
  definition: "the rule refusing a call that runs the akasha command from inside akasha",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A call is found in the parse and never in the text.",
    },
    {
      invariantKind: "departure",
      statement:
        "The dispatcher's path is refused wherever that path sits among a launching call's arguments.",
    },
    {
      invariantKind: "departure",
      statement: "The command's own name is refused in the program's place alone.",
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
      statement: "A file standing in the dispatcher's own folder is judged not.",
    },
    {
      invariantKind: "departure",
      statement: "A test file anywhere else is judged as any other.",
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
