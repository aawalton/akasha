import type { SyntaxRule } from "akasha/checks/code-checks/pages/no-refused-syntax/syntax-rules/syntax-rule.page-type.types.ts"

export const noCommandSpellingItsOwnCall = {
  id: "01a0944a-77a3-732c-91c2-0b714c12abf3",
  type: "syntax-rule",
  slug: "no-command-spelling-its-own-call",
  definition:
    "the rule refusing a command's own call spelled in a literal in that command's code or page",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A command's call is the folders under `commands/pages` the file sits in, a space for each slash.",
    },
    {
      invariantKind: "departure",
      statement: "A word a hyphen joins is refused spoken with a space in that hyphen's place.",
    },
    {
      invariantKind: "departure",
      statement: "Another command's call is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "The word `akasha` naming the repository is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "A piece of a template literal is judged as a whole string literal is.",
    },
    {
      invariantKind: "departure",
      statement: "A command's code and a command's page are both judged.",
    },
    {
      invariantKind: "departure",
      statement: "What a directive on that page says is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "A test beside that code hands the call rather than spelling it.",
    },
    {
      invariantKind: "departure",
      statement: "A file outside `commands/pages` is refused nothing.",
    },
    {
      invariantKind: "absence",
      statement: "A name built as the code runs is not seen.",
    },
  ],
} as const satisfies SyntaxRule
