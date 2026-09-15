import type { SyntaxRule } from "akasha/check/code/pages/no-refused-syntax/syntax-rule/syntax-rule.page-type.types.ts"

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
      invariantKind: "invariant-kind/departure",
      statement:
        "A command's call is the folders under `command/pages` the file sits in, a space for each slash.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A word a hyphen joins is refused spoken with a space in that hyphen's place.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Another command's call is left alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The word `akasha` naming the repository is left alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A piece of a template literal is judged as a whole string literal is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A command's code and a command's page are both judged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "What a directive on that page says is left alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A test beside that code hands the call rather than spelling it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file outside `command/pages` is refused nothing.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A name built as the code runs is not seen.",
    },
  ],
} as const satisfies SyntaxRule
